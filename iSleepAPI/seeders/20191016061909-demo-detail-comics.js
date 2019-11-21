'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('listEpisodes', [
      {
        id: 1,
        title: "Chapter 1",
        imgListEpisodes: "https://i0.wp.com/lh3.googleusercontent.com/-5sBG5jO5Vi8/WdFYYIid73I/AAAAAAAA-uQ/o816LKHgy4cS5w3BijJdeiSvt3P2qo6fgCLcBGAs/s1600/003.jpg",
        idUser: 1,
        idComics: 2
      },
      {
        id: 2,
        title: "Chapter 1",
        imgListEpisodes: "https://i0.wp.com/lh3.googleusercontent.com/-61L_bvNqHws/XEDprPEXKII/AAAAAAAIgf8/kxUPYctMR9cm6S1ivRZT9BiDXRPNk_YugCLcBGAs/s1600/001.jpg",
        idUser: 1,
        idComics: 1
      },
      {
        id: 3,
        title: "Chapter 1",
        imgListEpisodes: "https://i0.wp.com/lh3.googleusercontent.com/-e-AHFnaHFQk/Wa7toL5_RGI/AAAAAAAAUW8/kTtuwaVNw4cn6ecihTGcfTOPjRT4KBdOgCLcBGAs/s1600/001.jpg",
        idUser: 1,
        idComics: 3
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
