var crosswordPuzzles = [
    {
      title: "Harry Potter Puzzle 1/2: Humble Beginnings.",
      progressKey: "484f4d45",
      size: 13,
      words: [
        {
          hint: "A suburban drive, mundane in sight, veiling a wizard from muggle plight.",
          answer: "505249564554",
          length: 6,
          position: { x: 4, y: 5, orientation: "horizontal" },
        },
        {
          hint: "He who must not be named, in darkness spreads his fame; a shadow over magical lands, only faced by brave wizarding wands.",
          answer: "564f4c44454d4f5254",
          length: 9,
          position: { x: 8, y: 1, orientation: "vertical" },
        },
        {
          hint: "Amongst spells and charms, their kind walk unseen, in a world of wonder, one has never been.",
          answer: "4d5547474c45",
          length: 6,
          position: { x: 1, y: 10, orientation: "horizontal" },
        },
        {
          hint: "A cousin not so kind, in a house of muggles entwined; his presence, often like a thud, amidst the world of magical mud.",
          answer: "4455444c4559",
          length: 6,
          position: { x: 12, y: 5, orientation: "vertical" },
        },
        {
          hint: "A mark of legend, not of harm; a lightning strike, a wizard\u2019s charm. On a young hero\u2019s brow it sits, a symbol of his fateful wits.",
          answer: "424f4c54",
          length: 4,
          position: { x: 0, y: 8, orientation: "horizontal" },
        },
        {
          hint: "In the young wizard\u2019s name, a legacy intertwined, a father\u2019s first, in his son\u2019s middle, you\u2019ll find.",
          answer: "4a414d4553",
          length: 5,
          position: { x: 6, y: 7, orientation: "vertical" },
        },
        {
          hint: "A giant in heart, a guardian so true, first to welcome Harry into a world anew.",
          answer: "484147524944",
          length: 6,
          position: { x: 5, y: 8, orientation: "horizontal" },
        },
        {
          hint: "Wisdom vast and a beard so white, Hogwarts\u2019 leader, a guiding light. Cloaked in mystery and ancient ends, in halls of magic, he\u2019s more than a friend.",
          answer: "414c425553",
          length: 5,
          position: { x: 2, y: 7, orientation: "vertical" },
        },
        {
          hint: "A mother\u2019s embrace in a floral guise, her name lives on in her son\u2019s emerald eyes.",
          answer: "4c494c59",
          length: 4,
          position: { x: 9, y: 10, orientation: "horizontal" },
        },
        {
          hint: "Snowy companion, silent wings in the night, bearer of secrets under the moon\u2019s light. Loyal and true, with eyes wide and bright, a feathered friend in a young wizard\u2019s plight.",
          answer: "484544574947",
          length: 6,
          position: { x: 10, y: 6, orientation: "vertical" },
        },
        // Add more words here as needed ...
      ],
    },
    {
      title: "Harry Potter Puzzle 2/2: Passage to a Sorcerer\u2019s Universe.",
      progressKey: "484f4753",
      size: 15,
      words: [
        {
          hint: "Vaulted depths guarded by more than locks.",
          answer: "4752494e474f545453",
          length: 9,
          position: { x: 9, y: 0, orientation: "vertical" },
        },
        {
          hint: "The first name of a professor adept in feline transformations.",
          answer: "4d494e45525641",
          length: 7,
          position: { x: 7, y: 3, orientation: "horizontal" },
        },
        {
          hint: "A crooked path to magical wares.",
          answer: "444941474f4e",
          length: 6,
          position: { x: 4, y: 2, orientation: "vertical" },
        },
        {
          hint: "Where corridors shift and portraits chat.",
          answer: "484f475741525453",
          length: 8,
          position: { x: 3, y: 6, orientation: "horizontal" },
        },
        {
          hint: "Not a ship, but it holds value in pockets.",
          answer: "47414c4c454f4e",
          length: 7,
          position: { x: 7, y: 5, orientation: "vertical" },
        },
        {
          hint: "Muggle-born, yet outshines many in spellcraft.",
          answer: "4845524d494f4e45",
          length: 8,
          position: { x: 0, y: 9, orientation: "horizontal" },
        },
        {
          hint: "Seekers, Snitches, and Bludgers aplenty, bring your broomstick, and soar away gently. In the sky's grand dance, under stars so twinkly, where the game of shadows plays, both fierce and dainty.",
          answer: "515549444449544348",
          length: 9,
          position: { x: 0, y: 1, orientation: "vertical" },
        },
        {
          hint: "Lions herald this house, brave at heart.",
          answer: "4752594646494e444f52",
          length: 10,
          position: { x: 1, y: 11, orientation: "horizontal" },
        },
        {
          hint: "Keeper of a rat, not just a pet.",
          answer: "524f4e",
          length: 3,
          position: { x: 10, y: 11, orientation: "vertical" },
        },
        {
          hint: "\u2018The wand chooses the wizard\u2019 here.",
          answer: "4f4c4c4956414e44455253",
          length: 11,
          position: { x: 4, y: 13, orientation: "horizontal" },
        },
      ],
    },
  ];

    
  // generate hashes
  // for (cross in crosswordPuzzles) {
  //   console.log(crosswordPuzzles[cross].progressKey, crosswordPuzzles[cross].progressKey.hash());
  //     for (word in crosswordPuzzles[cross].words) {
  //         const line = crosswordPuzzles[cross].words[word];
  //         console.log(line.answer, line.answer.hash());
  //     }
  // }

module.exports = { crosswordPuzzles };