class TTSController {
  async tts() {
    try {
      let text = req?.body?.text;
    } catch (error) {
      res.json({
        status: "ERROR",
        code: error?.code || 400,
        message: error?.message || "Smt wrong has occured!",
      });
    }
  }
}

module.exports = new TTSController();
