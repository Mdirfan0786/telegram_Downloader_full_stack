function OtpStep({ otp, setOtp, verifyLogin, loading }) {
  return (
    <div className="w-[400px] p-6 rounded-xl border">
      <h1 className="text-3xl font-bold mb-5">Verify OTP</h1>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-3 border rounded"
      />

      <button
        onClick={verifyLogin}
        className="w-full mt-4 p-3 bg-green-500 rounded"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
}

export default OtpStep;
