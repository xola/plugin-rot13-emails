const ActionMethods = {
    getEventName: (req) => {
        return (req.body && req.body.eventName) ? req.body.eventName : null;
    },

    installPlugin: (req, res) => {
        res.status(200).send("Plugin installed");
    },

    updatePlugin: (req, res) => {
        res.status(200).send("Plugin updated");
    },

    uninstallPlugin: (req, res) => {
        res.status(200).send("Plugin uninstalled");
    },

    encodeEmail: (req, res) => {
        let subject = req.body.data.subject;
        let body = req.body.data.body;
        console.log(subject);

        let newSubject = '';
        let lowACharCode = 'a'.charCodeAt(0);
        let upACharCode = 'A'.charCodeAt(0);
        for (let i = 0; i < subject.length; i++) {
            let currentChar = subject.charAt(i);
            if(currentChar.match(/[a-z]/g)) {
                currentChar = String.fromCharCode(((currentChar.charCodeAt(0) - lowACharCode + 13) % 26) + lowACharCode);
            } else if(currentChar.match(/[A-Z]/g)) {
                currentChar = String.fromCharCode(((currentChar.charCodeAt(0) - upACharCode + 13) % 26) + upACharCode);
            }
            newSubject += currentChar;
        }
        console.log(newSubject)

        let response = {
            subject: newSubject,
            body: body
        }
        res.status(200).send(JSON.stringify(response));
    }
};

module.exports = {
    ActionMethods: ActionMethods
};
