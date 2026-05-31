function PasswordStep({
  otp,
  setOtp,
  password,
  setPassword,
  verifyLogin,
  loading,
}) {
  return (
    <div className="w-[400px] p-6 rounded-xl border">
      <h1 className="text-3xl font-bold mb-5">Telegram 2FA</h1>

      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <input
        type="password"
        placeholder="2FA Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded mb-3"
      />

      <button onClick={verifyLogin} className="w-full p-3 bg-green-500 rounded">
        {loading ? "Logging In..." : "Login"}
      </button>
    </div>
  );
}

export default PasswordStep;
