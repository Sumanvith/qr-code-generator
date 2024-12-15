import React, { useState } from "react";
import bgImage from "./resources/bg-illustration.svg";
import lgImage from "./resources/logo-qr-generator.svg";
import { QRCodeCanvas } from "qrcode.react";

const Body = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);

  const handleGenerateQrCode = () => {
    if (qrCodeUrl.trim() === "") {
      alert("Please enter a valid URL"); // Handle empty input
      return;
    }
    setShowQrCode(true); // Show the QR code
  };
  const handleDownloadQrCode = () => {
    const canvas = document.querySelector("canvas");
    const size = 250;
    const padding = 40;
    const extendedSize = size + padding * 2;

    const extendedCanvas = document.createElement("canvas");
    extendedCanvas.width = extendedSize;
    extendedCanvas.height = extendedSize;

    const ctx = extendedCanvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, extendedSize, extendedSize);
    ctx.drawImage(canvas, padding, padding, size, size);

    const image = extendedCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
    link.href = image;
    link.download = `qrcode_${timestamp}.png`;
    link.click();
  };
  const handleShareQrCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(qrCodeUrl)
        .then(() => alert("URL copied to clipboard!"))
        .catch(() => alert("Failed to copy the URL."));
    } else {
      alert("Clipboard access is not supported in this browser.");
    }
  };
  return (
    <div className="flex relative bg-[#111729] min-h-screen">
      {!showQrCode ? (
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="m-8">
            <img src={lgImage} alt="bgImage" className="h-[40px]" />
          </div>
          <div className="flex items-center w-2/5 bg-black border-2 h-16 border-[#3662E3] rounded-3xl">
            <input
              className="focus:outline-none flex-grow w-2/3 text-white bg-black h-12 m-1 px-8 placeholder:text-[#364153] rounded-3xl"
              type="url"
              placeholder="Enter an url"
              value={qrCodeUrl}
              onChange={(e) => setQrCodeUrl(e.target.value)}></input>
            <button
              className="w-1/5 h-12 m-1 text-white rounded-2xl bg-[#3662E3]"
              onClick={handleGenerateQrCode}>
              QR code
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="m-10">
            <img src={lgImage} alt="bgImage" className="h-[30px]" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <div className="relative flex items-center justify-center m-16">
              <div className="absolute bg-[#4e80ee33] w-80 h-80 rounded-full"></div>
              <QRCodeCanvas
                className="relative bg-white p-8 rounded-3xl"
                value={qrCodeUrl}
                size={250}
              />
            </div>
            <div className="flex justify-center w-2/3">
              <button
                className="w-1/6 h-14 m-2 text-white rounded-2xl bg-[#3662E3]"
                onClick={handleDownloadQrCode}>
                Download
              </button>
              <button
                className="w-1/6 h-14 m-2 text-white rounded-2xl bg-[#3662E3]"
                onClick={handleShareQrCode}>
                Share
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="absolute inset-10 z-10 flex justify-end items-center pointer-events-none">
        <img src={bgImage} alt="bgImage" className="" />
      </div>
    </div>
  );
};

export default Body;
