export type InitialQuestion = { label: string; values: string[] };
export type Responses = Record<string, string | string[] | Record<string, unknown>>;
export type DynamicResponses = Record<string, string | string[] | Record<string, unknown>>;

type DynamicFormQuestion = {
  key: string;
  label: string;
  type: string;
  options?: string[];
  required: boolean;
  maxSelect?: number;
};

type BackendDynamicForm = {
  title: string;
  description: string;
  questions: DynamicFormQuestion[];
};

type BackendDynamicFormResponse = {
  stage: 'dynamic_form';
  form: BackendDynamicForm;
};

type BackendProfileResponse = {
  stage: 'profile';
  profile: {
    id: string;
    meta: {
      createdAt: string;
      locale: string;
      version: string;
    };
    trip: {
      destinations: string[];
      dates?: { start?: string; end?: string };
    };
    preferences: {
      interests?: string[];
      rythmeStyle?: string;
      aiAssistance?: string | string[];
      additionalAnswers?: Record<string, any>;
      formAnswers?: { initial?: Record<string, any>; dynamic?: Record<string, any> };
    };
    budget: {
      currency: 'MAD';
      rangeMad?: string;
      estimatedPerDayMad?: number;
    };
  };
};

type BackendErrorResponse = {
  error: true;
  message: string;
};

export type ShowDynamicForm = {
  nextAction: 'show_dynamic_form';
  dynamicForm: BackendDynamicForm;
};

export type DoneProfile = {
  nextAction: 'done';
  profile: BackendProfileResponse['profile'];
  tripId: string; // UUID généré pour le trip
};

export type ErrorResult = {
  nextAction: 'error';
  message: string;
};

export type StartOnboardingArgs = {
  BACKEND_URL: string;
  INITIAL_QUESTIONS: InitialQuestion[];
  INITIAL_RESPONSES: Responses;
  ACCEPT_DYNAMIC_FORM: boolean;
};

export type ContinueOnboardingArgs = StartOnboardingArgs & {
  DYNAMIC_RESPONSES: DynamicResponses;
};

/**
 * Génère un UUID v4 simple
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Stocke les préférences utilisateur dans localStorage
 */
function saveTripPreferences(tripId: string, profile: BackendProfileResponse['profile']): void {
  if (typeof window === 'undefined') return;
  
  const tripData = {
    tripId,
    profile,
    createdAt: new Date().toISOString(),
  };
  
  localStorage.setItem(`trip_${tripId}`, JSON.stringify(tripData));
  
  // Stocke aussi la liste des trips de l'utilisateur
  const tripsList = JSON.parse(localStorage.getItem('user_trips') || '[]') as string[];
  if (!tripsList.includes(tripId)) {
    tripsList.push(tripId);
    localStorage.setItem('user_trips', JSON.stringify(tripsList));
  }
}

async function postOnboarding(
  url: string,
  body: {
    questions: InitialQuestion[];
    responses: Responses;
    acceptDynamicForm: boolean;
    dynamicResponses?: DynamicResponses;
  }
): Promise<BackendDynamicFormResponse | BackendProfileResponse | BackendErrorResponse> {
  const res = await fetch(`${url}/api/onboarding`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    return { error: true, message: `HTTP ${res.status}: ${text}` } as BackendErrorResponse;
  }

  const responseData = await res.json();

  // Handle wrapped response format {success: true, data: {...}}
  if (responseData.success && responseData.data) {
    return responseData.data as BackendDynamicFormResponse | BackendProfileResponse;
  }

  // Handle direct response format
  return responseData as BackendDynamicFormResponse | BackendProfileResponse | BackendErrorResponse;
}

export async function startOnboarding(
  args: StartOnboardingArgs
): Promise<ShowDynamicForm | DoneProfile | ErrorResult> {
  const { BACKEND_URL, INITIAL_QUESTIONS, INITIAL_RESPONSES, ACCEPT_DYNAMIC_FORM } = args;

  const body = {
    questions: INITIAL_QUESTIONS,
    responses: INITIAL_RESPONSES,
    acceptDynamicForm: ACCEPT_DYNAMIC_FORM,
  };

  const resp = await postOnboarding(BACKEND_URL, body);

  if ('error' in resp) {
    return { nextAction: 'error', message: resp.message } as ErrorResult;
  }

  if (resp.stage === 'dynamic_form') {
    return {
      nextAction: 'show_dynamic_form',
      dynamicForm: resp.form,
    } as ShowDynamicForm;
  }

  if (resp.stage === 'profile') {
    // Générer un UUID pour le trip
    const tripId = generateUUID();
    
    // Enregistrer les préférences dans localStorage
    saveTripPreferences(tripId, resp.profile);
    
    return {
      nextAction: 'done',
      profile: resp.profile,
      tripId,
    } as DoneProfile;
  }

  return {
    nextAction: 'error',
    message: 'Unknown response from backend',
  } as ErrorResult;
}

export async function continueOnboarding(
  args: ContinueOnboardingArgs
): Promise<DoneProfile | ErrorResult> {
  const { BACKEND_URL, INITIAL_QUESTIONS, INITIAL_RESPONSES, ACCEPT_DYNAMIC_FORM, DYNAMIC_RESPONSES } = args;

  const body = {
    questions: INITIAL_QUESTIONS,
    responses: INITIAL_RESPONSES,
    acceptDynamicForm: ACCEPT_DYNAMIC_FORM,
    dynamicResponses: DYNAMIC_RESPONSES,
  };

  const resp = await postOnboarding(BACKEND_URL, body);

  if ('error' in resp) {
    return { nextAction: 'error', message: resp.message } as ErrorResult;
  }

  if (resp.stage === 'profile') {
    // Générer un UUID pour le trip
    const tripId = generateUUID();
    
    // Enregistrer les préférences dans localStorage
    saveTripPreferences(tripId, resp.profile);
    
    return {
      nextAction: 'done',
      profile: resp.profile,
      tripId,
    } as DoneProfile;
  }

  return {
    nextAction: 'error',
    message: 'Expected profile stage but got something else',
  } as ErrorResult;
}
