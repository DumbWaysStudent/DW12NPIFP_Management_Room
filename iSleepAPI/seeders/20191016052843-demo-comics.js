'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comics', [
      {
        id: 1,
        title: "Kimetsu no Yaiba",
        description: "Disetting pada era Taisho Jepang. Tanjirou adalah seorang anak muda yang baik hati yang hidup damai dengan keluarganya sebagai penjual batubara. kehidupan normal mereka berubah sepenuhnya ketika keluarganya dibantai oleh setan. salah satu yang selamat lai",
        genre: 3,
        imgComics: "https://i0.wp.com/lh3.googleusercontent.com/-1Og6l6uiYx4/XEDprQCJVjI/AAAAAAAIggE/5vFryw8Qq4YCOQm8BF_bC6Z9d6t7hoTBwCLcBGAs/s1600/003.jpg",
        createdBy: 1
      },
      {
        id: 2,
        title: "Dr. Stone",
        description: "The science-fiction adventure series follows what happens when suddenly the world's biggest-ever \"crisis\" arrives.",
        genre: 3,
        imgComics: "https://i0.wp.com/lh3.googleusercontent.com/-5sBG5jO5Vi8/WdFYYIid73I/AAAAAAAA-uQ/o816LKHgy4cS5w3BijJdeiSvt3P2qo6fgCLcBGAs/s1600/003.jpg",
        createdBy: 1
      },
      {
        id: 3,
        title: "Tales of Demons and Gods",
        description: "Nie Lie, Demon Spiritist yang terkuat dikehidupan masa lalunya yang berdiri di puncak dunia persilatan, namun dia kehilangan nyawanya saat pertarungan dengan Sage Emperor dan keenam dewa berperingkat binatang, jiwanya kemudian terlahir kembali saat dia ma",
        genre: 3,
        imgComics: "https://i0.wp.com/lh3.googleusercontent.com/-e-AHFnaHFQk/Wa7toL5_RGI/AAAAAAAAUW8/kTtuwaVNw4cn6ecihTGcfTOPjRT4KBdOgCLcBGAs/s1600/001.jpg",
        createdBy: 1
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
