export const matchingObj = {
  lightbg: false,
  dataPath: '../data/usermatch.json',
  getEndpoint: 'http://localhost:5000/api/usermatch',
  setEndpoint: 'http://localhost:5000/api/userback',
  thumbnailHeight: 400,
  maxDescLength: 500,
  emptyImage: 'images/empty-thumbnail.png',
};

export const home = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  headline: 'Verify your email',
  description:
    'Please check your email and click the link to complete the verification process. Make sure to check your Spam folder, too!',
  buttonLabel: 'Resend verification email',
  imgStart: 'start',
  img: 'images/email.svg',
  alt: 'email'
};
