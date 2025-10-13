module.exports.getBrowserLogs = async(suiteTitle) => {
    if (process.env.SAVE_LOGS === 'true') {
        const data = await browser.getLogs('browser');
        let logs = '';
        if (data.length === 0)
            return 'empty';
        for (let i = 0; i < data.length; i++)
            logs += JSON.stringify(data[i]) + '\n';
        return `-------------${suiteTitle}-------------\n${logs}\n`;
    }
};
