"use client";

function WhatsappButton({ phone_number }: { phone_number: string }) {
  const handleWhatsappMessage = () => {
    if (!phone_number) {
      alert("Esse motorista não tem contato de telefone.");
      return;
    }
    const message =
      "Olá, tudo bem? Vim do site AcheiMotorista e gostaria de agendar uma viagem particular!";
    const url = `https://wa.me/55${phone_number}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <button className="self-center" onClick={handleWhatsappMessage}>
      agenda sua viagem agora
    </button>
  );
}

export default WhatsappButton;
