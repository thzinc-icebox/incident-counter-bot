'use latest';
import 'date-util';
import moment from 'moment';

module.exports = (ctx, cb) => {
    let handled = false;
    if (ctx.body) {
        console.log(ctx.body);
        // Set date
        const triggerWord = ctx.body.trigger_word;
        const text = ctx.body.text.slice(triggerWord.length).replace(/^\W+|\W+$/ig, '');
        console.log(`text: ${text}`);

        const dateSetter = incidentDate => new Promise((res, rej) =>
        ctx.storage.get((err, data) => {
            if (err) return rej(err);

            data = incidentDate;

            ctx.storage.set(data, setErr => {
                if (setErr) return rej(setErr);

                res(data);
            })
        }));

        const setToPattern =/\bset\b.*\bto\b(.+)/i;
        let date;
        if (/\breset\b/ig.test(text)) {
            handled = true;
            date = new Date();
        }
        else if (setToPattern.test(text)) {
            handled = true;
            var incidentTime = setToPattern.exec(text)[1];
            date = new Date().strtotime(incidentTime);
        }

        if (handled) {
            dateSetter(date)
                .then(d => cb(null, {
                    text: `Incident counter set to ${d}`
                }));
        }
    }

    if (handled) return;

    ctx.storage.get((err, data) => {
        const days = moment().diff(moment(data), 'days');
        const preposition = days >= 0 ? 'since last' : 'until next';
        cb(null, {
            text: `${Math.abs(days)} days ${preposition} incident`,
        });
    });
};
