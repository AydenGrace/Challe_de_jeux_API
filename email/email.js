const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactForm = async (content) => {
  const mailOptions = {
    priority: "high",
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_MAIL,
    subject: "Nouveau formulaire de contact : " + content.subject,
    html: `<p>De: ${content.name}<br/>Email : ${
      content.email
    }<br/>Daté du : ${content.date.toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
    })}<br/><br/>${content.content}</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendConfirmationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation d'inscription",
    html: `<p>Merci de vous être inscrit ! Cliquez sur le lien suivant pour confirmer l'inscription : <a href="${process.env.BASE_URL}/verify_mail/${token}">Confirmer l'inscription</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendValidationAccount = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Inscription validée",
    html: `<p>Bienvenue sur notre site ! Cliquez sur le lien pour vous connecter : <a href="${process.env.BASE_URL}">Se connecter</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendInvalideToken = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Problème lors de la validation de votre compte.",
    html: `<p>Le temps d'inscription a expiré. Cliquez sur le lien pour vous inscrire à nouveau : <a href="${process.env.BASE_URL}">S'inscrire</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendChangePwd = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Demande de changement de mot de passe.",
    html: `<p>Votre demande de changement de mot de passe a bien été reçue. Si cette demande n'est pas de votre initiative, merci d'ignorer le lien suivant : <a href="${process.env.BASE_URL}/change_password/${token}">Modifier mon mot de passe</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendBookingValidation = async (email, reservation, session) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Demande de réservation validée",
    html: `<p>Bonjour,<br/>Votre demande de réservation pour la salle <strong>${
      session.room.name
    } le ${new Date(session.date).getDate()}/${
      new Date(session.date).getMonth() + 1
    }/${new Date(session.date).getFullYear()} à ${new Date(
      session.date
    ).getHours()}H${new Date(
      session.date
    ).getMinutes()}</strong> à été validé.<br/><br/>Composition de l'équipe : ${
      reservation.nbPlayers
    } Joueurs pour un total de ${
      reservation.price
    }€.<br/><br/>Merci de vous présenter à l'accueil 15min avant le début de votre session.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendPayValidation = async (email, reservation, session) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Paiement effectué",
    html: `<p>Bonjour,<br/>Votre paiement pour la réservation de la salle <strong>${
      session.room.name
    } le ${new Date(session.date).getDate()}/${
      new Date(session.date).getMonth() + 1
    }/${new Date(session.date).getFullYear()} à ${new Date(
      session.date
    ).getHours()}H${new Date(
      session.date
    ).getMinutes()}</strong> à bien été effectué par carte bancaire.<br/><br/>Composition de l'équipe : ${
      reservation.nbPlayers
    } Joueurs pour un total de ${
      reservation.price
    }€.<br/><br/>En cas de problème, merci de nous le signaler par appel téléphone ou en remplissant notre formulaire de contact.<br/><br/>En vous souhaitant une Miaou Journée !</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendConfirmationEmail,
  sendValidationAccount,
  sendInvalideToken,
  sendChangePwd,
  sendContactForm,
  sendBookingValidation,
  sendPayValidation,
};
