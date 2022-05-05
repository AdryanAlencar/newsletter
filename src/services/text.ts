const formater = (text: string) => {
    //date in format DD/MM/YYYY
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var today = day + "/" + month + "/" + year;

    var template = {
        "text": `Notícias do dia ${today}`,
        "blocks": [
        ] as {type: string, text?: {
            text: string
            type: string
        }}[] 
    }

    var splited = text.split("\n")
    var news = []
    var temp = {
        text: "",
        header: {} as {type: string, text?: {
            text: string
            type: string
        }}
    }

    splited.forEach((line : string) => {
        if (line == '' && temp.text.indexOf("https") == -1) {
            if (temp.text.length > 0) {
                template.blocks.push(temp.header)

                template.blocks.push({
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `${temp.text}`
                    }
                })
                template.blocks.push({
                    "type": "divider"
                })
            }
            temp = {
                text: "",
                header: {} as {type: string, text?: {
                    text: string
                    type: string
                }}
            }
            return
        }

        if (temp.text.length == 0) {
            // replace all "*" with nothing 
            line = line.replace(/\*/g, "")
            temp.header = {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": line
                }
            }
            temp.text = " "
        } else {
            if (line != undefined) {
                temp.text += line + ' ';
            }
        }
    })

    return template
}

export {
    formater
}

