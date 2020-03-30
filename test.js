var spawn = require('child_process').spawn;

// var text = `Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid. The game is played by millions of people worldwide. Chess is believed to be derived from the Indian game chaturanga sometime before the 7th century. Chaturanga is also the likely ancestor of the Eastern strategy games xiangqi (Chinese chess), janggi (Korean chess), and shogi (Japanese chess). Chess reached Europe by the 9th century, due to the Umayyad conquest of Hispania. The pieces assumed their current powers in Spain in the late 15th century; the modern rules were standardized in the 19th century.

// `;
var process = spawn('python', ['./NLPserver/test.py']);
process.stdout.on('data', function(data) {
  console.log(`data:${data.toString()}`);
  // Resume.findOne({ profile: profile._id }, function(err, resume) {
  //   if (err) {
  //     console.error(err.message);
  //   }
  //   if (!resume) {
  //     resume = new Resume({
  //       profile: profile._id
  //     });
  //   }
  //   resume.content = data;
  //   resume.save();
  // });
  console.log(1);
});
