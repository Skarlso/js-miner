var chalk = require('chalk');
var Tmux = function() {};
exec = require('child_process').exec;

Tmux.prototype.run = function() {
    console.log("Executing tmux.");
    exec("tmux new -d -s minecraft 'docker exec -it mc_server3 java -jar /minecraft/craftbukkit-1.11.2.jar nogui'", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });
};

module.exports = new Tmux();