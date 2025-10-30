"use client";

export default function BackgroundCarousel() {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDob94f2hjwLvaPBL-BIh_xW29LOy1uz7W9CBhtFXrrxa3HPVdT69dTX1_IiKMMiXVlQRZFzCJ9jX4zephVCTFvBITFR4IbH1V05a1rDyi9JA8P0nLOUNxQXlVANBovcFlbB01lUKjZjMlonaaLzaQD_gBrb6eN28Kdc5zxhQT_49hqAEwRAGZWudIeKyuWKtxZKM9blg3X8eZ8Wc1QojLwt38nfI5dxgGEPD0xi-M3N_-Vq3Bh7rsQE43kJ_FJJvHvn8ss9T768TnQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBfS9xDY7aDW4SVxd24FMzO59cKcUtl9EoWMto8ldEDCsDtRFCBevfJSw8UrSLx9TN55kl82ArzuK5bTDhkTS4iwvD_R6aEshUXB2chxELtzBjSHMDIGRHdg2Zbz2XeJF3Kurc-CBaF2Tq8SwXCpiMKbNLihCl42wv3sdxtgTk8-9fZT0FDA4_J65FopvLhgwSv0fYKj3B1UHfcpTZdRzCxqva9QqIRx_ckmN2fQes0byDDwSX0xm1sBw8e9AovtGz9xBwrOmevkCIq",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCwsPAPducwxp1Wydwr0fMWWA-WOwKgecgsU-TsTRS6FXTAJwlMiU6Adz-2Ga2zkjvCvjgHr0ovd2fWAA9Ka1OjqsPMbAEaNdpCTyqm1MiAsdBuLc_X6o2O4wIHX1JxoRQr91Z9E2xEj7whV2N9hD6jNGU0zZ42rXPCjey-7TcaxTR-fS8IeXCDJzl905FZoSUAaRUpajKmp2GRrU5doMjZcfj79MXsFfuJlF_CRJ89QWtaVAsUuHApRXq2l3MCmLJ-3cSnvFt9GAjV",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA1MeMiT_XtLRYymeuz3P6o5_Y5LrhPnowXS6PZoj-WJC1RWJUnWdp9vc8wxnhmr6zAfBEZgZVpy9Smyb14Z-Yha8UyNVHmfSOVXBQGaYR9aVx_o2CqDKkEGvYYRrrEVVpSr3GnM9MVOAYN9FFl_bLJJUwMP331qa-sGbE6v5T3Oift--g8MKFkLOq8bsh12aJ_MyBM5bsM6u-_eMU-8ik-NEcxEleMKKWXXbml0emPlrXL9L2pEnmCbNfs0pO8MphoDWCQy9AsnDdw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD8tjHZAlGNe1jx_vrE-87qMBD1cEyyeoibCebzRk8g_iapibstrLd0XGTFb2M3Y8Wmh2ZQJjmWYxdsiV6dKoV8lp47mit_Pf1PH_1mkJwM2OlriLKJ8B5L4HoCvkqF16op284kECAiHE-zfGIVMhG4a4vhqXKuCdxXWogNC1772ReOGLsqFSb1p453IdjcLUGVbqDmJOf-joO7-sG4-ouVqDQ7lnOj6OHMxePZ-26-btTHvgUycQKfrE2fGMc7Io14orFnGHBrz237",
  ];

  return (
    <>
      <style jsx>{`
        .carousel-item {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          animation: fade-carousel 25s infinite;
        }

        .carousel-item:nth-child(1) {
          animation-delay: 0s;
        }

        .carousel-item:nth-child(2) {
          animation-delay: 5s;
        }

        .carousel-item:nth-child(3) {
          animation-delay: 10s;
        }

        .carousel-item:nth-child(4) {
          animation-delay: 15s;
        }

        .carousel-item:nth-child(5) {
          animation-delay: 20s;
        }

        @keyframes fade-carousel {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          20% {
            opacity: 1;
          }
          30% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
      <div className="absolute inset-0 z-[-2]">
        {images.map((img, index) => (
          <div
            key={index}
            className="carousel-item"
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-[-1]" />
    </>
  );
}
