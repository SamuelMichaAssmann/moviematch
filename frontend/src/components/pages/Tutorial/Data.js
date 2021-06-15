export const matchingObj = {
  lightbg: false,
  dataPath: '../data/usermatch.json',
  getEndpoint: 'http://localhost:5000/api/usermatch',
  setEntpoint: 'http://localhost:5000/api/userback',
  thumbnailHeight: 400,
  maxDescLength: 500,
  emptyImage: 'images/empty-thumbnail.png',
};

export const home = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  headline: 'Verify your Email',
  description:
    'Please check your email and confirm the link to complete the verification process.',
  buttonLabel: 'Resend Email',
  imgStart: 'start',
  img: 'images/email.svg',
  alt: 'email',
  link: '/TMDb'
};
