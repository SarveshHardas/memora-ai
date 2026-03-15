export default function VideoEditor() {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <iframe
        src="https://clideo.com/editor/"
        className="w-full h-full border-0"
        allow="clipboard-write; clipboard-read"
      />
    </div>
  );
}
