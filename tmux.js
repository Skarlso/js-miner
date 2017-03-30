var chalk = require('chalk');
var Tmux = function() {};
exec = require('child_process').exec;

Tmux.prototype.run = function(container) {
    console.log("Executing tmux with container: %s.", container);
    exec("tmux new -d -s minecraft \"docker exec -it " + container + " bash -c 'echo \"eula=true\" > eula.txt ; java -jar /minecraft/craftbukkit.jar nogui'\"", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
};

module.exports = new Tmux();
