const User = require('../models/User'),
  Profile = require("../models/Profile"),
  mongoose = require('mongoose'),
  dbURI = require('../config/keys').mongoDB.mongoURI,
  faker = require('faker'),
  gravatar = require('gravatar'),
  bcrypt = require('bcryptjs');

mongoose
  .connect(
    dbURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('mongodb connected!!'))
  .catch(err => console.log(err));

const mongooseDisconnect = () => {
  mongoose.disconnect();
}

let totalNumSeeds = 20,
  numSavedUser = 0;


for (let i = 0; i < totalNumSeeds; i++) {
  const newUser = new User({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    avatar: gravatar.url(faker.internet.email(), {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    }),
    password: 'test123'
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(async (user) => {
          const profile = await addUserBio(user._id)
          await addEducation(profile)
          await addCareer(profile)
          await addCareer(profile)
          await addCareer(profile)

          numSavedUser++
          if (numSavedUser === totalNumSeeds) {
            mongooseDisconnect();
          }
        })
        .catch(err => console.log(err));
    });
  });
}
const addUserBio = (id) => {

  const profileFields = {
    user: id,
    handle: faker.internet.userName(),
    company: faker.company.companyName(),
    website: `${faker.company.companyName()}.com`,
    location: `${faker.address.streetName()} ${faker.address.streetAddress()}`,
    status: 'Developer',
    skills: [
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz(),
      faker.company.bsBuzz()
    ],
    githubusername: 'FakeGithubName',
    bio: faker.lorem.paragraph(),
    social: {
      youtube: 'youtube.com',
      twitter: 'twitter.com',
      facebook: 'facebook.com',
      linkedin: 'linkedin.com',
      instagram: 'instagram.com'
    }
  }
  return new Profile(profileFields).save();
}
const addEducation = (profile) => {

  const newEdu = {
    school: `${faker.name.lastName()} University`,
    degree: 'Bachelar',
    fieldofstudy: faker.name.jobArea(),
    from: "2019-03-11T00:00:00.000Z",
    to: "2019-03-11T00:00:00.000Z",
    current: true,
    description: faker.lorem.paragraph(),
  }
  profile.education.unshift(newEdu);
  return profile.save()
}
const addCareer = (profile) => {

  const newExp = {
    title: faker.name.title(),
    company: faker.company.companyName(),
    location: faker.address.streetAddress(),
    from: "2019-03-11T00:00:00.000Z",
    to: "2019-03-11T00:00:00.000Z",
    current: true,
    description: faker.lorem.paragraph(),
  }
  profile.experience.unshift(newExp);
  return profile.save()
}

