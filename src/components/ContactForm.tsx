import React, { useEffect, useRef, useState } from "react";
import { useAnimationControls, motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser"
import Sec from "./Section";
emailjs.init("lPNDYXO-4WREGEgyS");

type props = {
  title?: string,
  subtitle?: string,
  sectionName?: string,
  id?: string
}

interface contactProps {
  props: props
}

const ContactForm = ({ props }: contactProps) => {
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [firstName, setFirstName] = useState("");
  const controlsForm = useAnimationControls();
  const messageControls = useAnimationControls();
  const inView = useInView(form, { once: true, margin: "100px 0px 100px 0px" });

  const variants = {
    initial: { opacity: 0, x: -10 },
    enter: {
      opacity: 1,
      x: 0,
      transition: { ease: "easeIn", duration: 0.5 },
    },
    exit: {
      x: 10, opacity: 0,
      transition: { ease: "easeOut", duration: 0.5 },
    },
  }

  const formVariants = {
    initial: { opacity: 0, },
    enter: {
      opacity: 1,
      transition: { ease: "easeIn", duration: 0.5, staggerChildren: 0.25 },
    },
    exit: { opacity: 0, transition: { ease: "easeOut", duration: 0.5, staggerChildren: 0.25 } },
  };
  const messageVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1, display: "flex" },
    exit: { opacity: 0, display: "none" },
  };
  const sequence = async () => {
    await controlsForm.start("exit");
    return await messageControls.start("enter");
  };

  const sentMessages = [
    "Rocketed to the Inbox!",
    "Sent into Cyberspace!",
    "Beam Successful!",
  ]

  const sendingMessages = [
    "Deploying Digital Doves...",
    "Beaming Bytes...",
    "Propelling Prose..."
  ]

  const sendMessages = [
    "Toss Your Text",
    "Hoot and Holler",
    "Blast the Bits",
  ]

  const contactTexts = [
    "Tell Us All: We've Got the Ears, You Bring the Words",
    "Let's Chat: Because Emails are the New Coffee Breaks",
    "Buzz Us: Your Questions, Our Answers, No Sting Attached",
  ]

  function getRandomInt(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var computerResponse = getRandomInt(0, 2);

  const [rand, setRand] = useState(computerResponse)



  useEffect(() => {
    setRand(computerResponse)
    console.log(rand)
  }, []);

  const [status, setStatus] = useState(sendMessages[rand]);

  const bringBackform = async (e: any) => {
    e.preventDefault();
    await messageControls.start("exit");
    return await controlsForm.start("enter");
  };

  const testMail = (e: any) => {
    e.preventDefault();
    setStatus(sendingMessages[rand]);
    setTimeout(() => {
      setStatus(sentMessages[rand]);
      setTimeout(() => {
        setStatus(sendMessages[rand]);
      }, 1000);
      setFirstName("");
      setEmail("")
      setMessage("")
      sequence();
    }, 1000);
  };
  const sendEmail = (e: any) => {
    e.preventDefault();
    if (form.current == null) return;
    setStatus(sendingMessages[rand]);
    emailjs
      .sendForm(
        "service_svvit4h",
        "template_t5ebzez",
        form.current,
        "lPNDYXO-4WREGEgyS"
      )
      .then(
        (result: any) => {
          setStatus(sentMessages[rand]);
          setTimeout(() => {
            setStatus(sendMessages[rand]);
          }, 1000);
          sequence();
          setFirstName("");
          setEmail("")
          setMessage("")
        },
        (error: any) => {
          setStatus("Oops...");
          alert("Unable to send e-mail...");
        }
      );
  };

  useEffect(() => {
    if (inView) {
      controlsForm.start("enter");
    }
  }, [inView, controlsForm]);



  return (
    <>
      <Sec sectionName={props.sectionName}>
        <>
          <h3 data-before={props.title}>{props.title}</h3>
          <p>{contactTexts[rand]}</p>
          <motion.div
            className="thanks__message"
            variants={messageVariants}
            initial="initial"
            animate={messageControls}
            exit="exit"
          >
            <h4>Cheers!</h4>
            <p>We&apos;ll take care of it and will respond soon.</p>
            <button className="btn__outline" onClick={bringBackform}>
              Forgot anything?
            </button>
          </motion.div>
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            variants={formVariants}
            initial="initial"
            animate={controlsForm}
            exit="exit"
          >
            <input type="hidden" name="contact_number"></input>
            <motion.div variants={variants}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="user_name"
                // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
                value={firstName}
                placeholder={"Name"} // ...force the input's value to match the state variable...
                onChange={e => setFirstName(e.target.value)}
                required
              />
            </motion.div>
            <motion.div variants={variants}>
              <label htmlFor="email">E-Mail:</label>
              <input
                type="email"
                id="email"
                name="user_email"
                // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
                value={email}
                placeholder="E-Mail"
                onChange={e => setEmail(e.target.value)}
                required
                aria-describedby="emailHelp"
              />
            </motion.div>
            <motion.div variants={variants}>
              <label htmlFor="message">Message:</label>
              <textarea
                value={message}
                placeholder="Your message..."
                onChange={e => setMessage(e.target.value)}
                name="message"
                // className="bg-[#21212122] rounded-[2px] border border-[#222] text-neutral-50"
                id="message"
                required
                rows={5}
              />
            </motion.div>
            <motion.button variants={variants} className="btn__primary" type="submit">
              {status}
            </motion.button>
          </motion.form>
        </>
      </Sec>
    </>
  );
};

export default ContactForm;
