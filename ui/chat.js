var error = [{
    message: "You are too far away to chat with this person.",
    resp1: {
        text: "Continue."
    },
    resp2: {
        text: ""
    },
    resp3: {
        text: ""
    }
}];

var alice = [{
    message: "Alice: Hello Friend.  I'm playing a game with my friends Bob and Charlene.  Do you want to play with us?",
    resp1: {
        text: "Yes.",
        next: {
            message: "Alice: Great! One of them only lies and the other only tells the truth.  I'm trying to figure out which is which.  You should speak to them to find out.",
            resp1: { text: "Alright.  I'll be right back.", state: 1 },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        }
    },
    resp2: {
        text: "No.",
        next: {
            message: "Alice: Okay, then.  Peace out!",
            resp1: { text: "Good-bye." },
            resp2: { text: "" },
            resp3: { text: "" }
        }
    },
    resp3: { text: "Good-bye." }
},
    {
        message: "Alice: Return once you have spoken to Bob and Charlene.",
        resp1: {
            text: "Okay.  I'll be right back."
            },
        resp2: {
            text: ""
        },
        resp3: { text: "" }
    },
    {
        message: "Alice: Oh, you should still speak with Charlene.",
        resp1: {
            text: "Okay.  I'll be right back."
        },
        resp2: {
            text: ""
        },
        resp3: { text: "" }
    },
    {
        message: "Alice: Did you forget to talk to Bob too?",
        resp1: {
            text: "Yup.  I'll be right back."
        },
        resp2: {
            text: ""
        },
        resp3: { text: "" }
    },
    {
        message: "Alice: Who is the liar?",
        resp1: {
            text: "Bob.",
            next: {
                message: "You are correct!  Congratulations!",
                resp1: {
                    text: "Thanks! That was fun."
                },
                resp2: {
                    text: ""
                },
                resp3: {
                    text: ""
                }
            },
            state: 5
        },
        resp2: {
            text: "Charlene.",
            next: {
                message: "Oh, I'm sorry, but you are wrong.",
                resp1: {
                    text: "Shucks.  I thought I figured it out."
                },
                resp2: {
                    text: ""
                },
                resp3: {
                    text: ""
                }
            },
            state: 5
        },
        resp3: { text: "I'm not sure.  I'll be right back." }
    },
    {
        message: "Thanks for playing with us.",
        resp1: {
            text: "Good-bye."
        },
        resp2: {
            text: ""
        },
        resp3: {
            text: ""
        }
    }];

var bobsQuestions = {
    message: "Bob: Hello Friend.  Ask me any question you like.",
    resp1: {
        text: "Do you always tell the truth?",
        next: {
            message: "Bob: Yes, of course.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 2
    },
    resp2: {
        text: "Does Charlene always tell the truth?",
        next: {
            message: "Bob: Oh no, never.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 2
    },
    resp3: {
        text: "Do both you and Charlene always tell the truth?",
        next: {
            message: "Bob: Umm, yes we do.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 2
    }
};
bobsQuestions.resp1.next.resp1.next = bobsQuestions;
bobsQuestions.resp2.next.resp1.next = bobsQuestions;
bobsQuestions.resp3.next.resp1.next = bobsQuestions;

var bobsQuestions2 = {
    message: "Bob: Hello Friend.  Ask me any question you like.",
    resp1: {
        text: "Do you always tell the truth?",
        next: {
            message: "Bob: Yes, of course.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 4
    },
    resp2: {
        text: "Does Charlene always tell the truth?",
        next: {
            message: "Bob: Oh no, never.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 4
    },
    resp3: {
        text: "Do both you and Charlene always tell the truth?",
        next: {
            message: "Bob: Umm, yes we do.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 4
    }
};
bobsQuestions2.resp1.next.resp1.next = bobsQuestions2;
bobsQuestions2.resp2.next.resp1.next = bobsQuestions2;
bobsQuestions2.resp3.next.resp1.next = bobsQuestions2;

var bob = [{
    message: "Bob: I'm playing a game with my friends.  If you want to play talk to Alice.",
    resp1: {
        text: "Good-bye.",
    },
    resp2: {
        text: "",
    },
    resp3: {
        text: ""
    }
    },
    bobsQuestions,
    bobsQuestions,
    bobsQuestions2,
    bobsQuestions2,
    {
        message: "Bob: That was fun.  I enjoyed being the liar.",
        resp1: {
            text: "Good-bye.",
        },
        resp2: {
            text: "",
        },
        resp3: {
            text: ""
        }
    }];

var charlenesQuestions = {
    message: "Charlene: Okay, let's play.  Ask me any question you like.",
    resp1: {
        text: "Do you always tell the truth?",
        next: {
            message: "Charlene: Yes, I do.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 3
    },
    resp2: {
        text: "Does Bob always tell the truth?",
        next: {
            message: "Charlene: Nope, he's a big liar.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 3
    },
    resp3: {
        text: "Do both you and Bob always tell the truth?",
        next: {
            message: "Charlene: No, one of us is a liar.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 3
    }
};
charlenesQuestions.resp1.next.resp1.next = charlenesQuestions;
charlenesQuestions.resp2.next.resp1.next = charlenesQuestions;
charlenesQuestions.resp3.next.resp1.next = charlenesQuestions;

var charlenesQuestions2 = {
    message: "Charlene: Okay, let's play.  Ask me any question you like.",
    resp1: {
        text: "Do you always tell the truth?",
        next: {
            message: "Charlene: Yes, I do.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 4
    },
    resp2: {
        text: "Does Bob always tell the truth?",
        next: {
            message: "Charlene: Nope, he's a big liar.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 4
    },
    resp3: {
        text: "Do both you and Bob always tell the truth?",
        next: {
            message: "Charlene: No, one of us is a liar.",
            resp1: { text: "I have more questions" },
            resp2: { text: "Good-bye." },
            resp3: { text: "" }
        },
        state: 4
    }
};
charlenesQuestions2.resp1.next.resp1.next = charlenesQuestions2;
charlenesQuestions2.resp2.next.resp1.next = charlenesQuestions2;
charlenesQuestions2.resp3.next.resp1.next = charlenesQuestions2;

var charlene = [{
    message: "Charlene: We're all playing a game.  If you want to join go talk to Alice.",
    resp1: {
        text: "Good-bye.",
    },
    resp2: {
        text: "",
    },
    resp3: {
        text: ""
    }
},
    charlenesQuestions,
    charlenesQuestions2,
    charlenesQuestions2,
    charlenesQuestions2,
    {
        message: "Charlene: What a fun game.",
        resp1: {
            text: "Good-bye.",
        },
        resp2: {
            text: "",
        },
        resp3: {
            text: ""
        }
    }];