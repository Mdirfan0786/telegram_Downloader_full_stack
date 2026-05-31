function PhoneStep({ phone, setPhone, sendOtp, loading }) {
  return (
    <div className="w-[400px] p-6 rounded-xl border">
      <h1 className="text-3xl font-bold mb-5">TeleBox Login</h1>

      <input
        type="text"
        placeholder="+91xxxxxxxxxx"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 border rounded"
      />

      <button onClick={sendOtp} className="w-full mt-4 p-3 bg-blue-500 rounded">
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </div>
  );
}

export default PhoneStep;
