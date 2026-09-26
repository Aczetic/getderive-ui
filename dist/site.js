/* Supply the real URLs before launch. */
const configuration = { bookingUrl: '', linkedInUrl: '' };
document.querySelectorAll('.contact').forEach((contact) => { if (configuration.bookingUrl) { contact.href = configuration.bookingUrl; contact.classList.remove('pending'); contact.removeAttribute('aria-disabled'); } });
if (configuration.linkedInUrl) { const linkedIn = document.querySelector('.linkedin'); const link = document.createElement('a'); link.href = configuration.linkedInUrl; link.textContent = 'LinkedIn'; linkedIn.replaceChildren(link); }
