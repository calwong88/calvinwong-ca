// Contact form handler.
// Posts to a serverless relay that holds the Mailjet credentials server-side.
// This file is public, so it must never contain an API key or secret.
(function () {
  // TODO: replace with your deployed Cloudflare Worker URL, e.g.
  // "https://calvinwong-contact.YOURSUBDOMAIN.workers.dev"
  var RELAY_ENDPOINT = "";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = document.getElementById("contact-form-status");
  var submitBtn = form.querySelector("button[type='submit']");

  function setStatus(message, isError) {
    statusEl.textContent = message;
    statusEl.className = isError ? "form-status error" : "form-status success";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Honeypot: bots fill every field, humans never see or fill this one.
    if (form.elements["company"] && form.elements["company"].value) {
      return;
    }

    if (!RELAY_ENDPOINT) {
      setStatus(
        "The contact form isn't fully set up yet \u2014 please use the email link above instead.",
        true
      );
      return;
    }

    var name = form.elements["name"].value.trim();
    var email = form.elements["email"].value.trim();
    var message = form.elements["message"].value.trim();

    if (!name || !email || !message) {
      setStatus("Please fill in your name, email, and message.", true);
      return;
    }

    submitBtn.disabled = true;
    setStatus("Sending\u2026", false);

    fetch(RELAY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, message: message }),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Relay responded with " + res.status);
        setStatus("Thanks \u2014 your message has been sent. I'll get back to you soon.", false);
        form.reset();
      })
      .catch(function () {
        setStatus(
          "Something went wrong sending your message. Please try the email link above instead.",
          true
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
})();
