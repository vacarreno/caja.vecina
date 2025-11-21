export default function QRCodeBox({ svg }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{
        width: 240,
        border: "1px solid #ccc",
        padding: 10,
        borderRadius: 10,
        background: "#fff"
      }}
    />
  );
}
