import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faComputer, faHome, faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { motion } from "framer-motion";


const parent = {
    initial: {
        transition: { staggerChildren: 0.2 },
    },
    enter: {
        transition: { delay: .5, staggerChildren: 0.2, delayChildren: 0.35 },
    },
    exit: {
        transition: { staggerChildren: 0.2 },
    },
};

const child = {
    initial: { opacity: 0, x: 100 },
    enter: {
        opacity: 1,
        x: 0,
        transition: { ease: "easeIn", duration: 0.5, delay: 1 },
    },
    exit: {
        opacity: 0,
        x: -100,
        transition: { ease: "easeOut", duration: 0.5 },
    },
};

export const texts: any = {
    Troy: (<><p>Hi, I&lsquo;m Troy Dating and Confidence Coach for Men I&lsquo;m also an author, having written eleven books on dating and relationships, as well as countless articles on related topics. Through in-person and online coaching, plus through my writing and YouTube videos I&lsquo;ve helped thousands of men learn to overcome trauma and social anxiety to become the best possible versions of themselves and excel both socially and with women. I mainly work with these men one-on-one, challenging them to drill down to the very root of their problems, to confront themselves and the demons they face from the past, and create proactive strategies for them to attract the women they want to date, while also enjoying better friendships, family relationships and bonds with others generally.</p>
        <motion.div variants={parent} className="socials">
            <Link href="https://realtroyfrancis.com/"><FontAwesomeIcon icon={faHome} /> </Link>
            <Link href="https://www.youtube.com/@RealTroyFrancis"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/realtroyfrancis/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/RealTroyFrancis"><FontAwesomeIcon icon={faTwitter} /> </Link>
        </motion.div>
    </>),
    Aaron: (<><p>Hello, I&lsquo;m Aaron Clarey and I&lsquo;m an asshole. Let me be short and succinct. I dealt with enough incompetent corporate banking douchebags and their criminal clientele to know bullshit when I see it.And my experience in dealing with frauds and idiots isn&lsquo;t relegated to just the business world. Batshit insane women, dealing with mortgage companies and the problems of homeownership, soulless universities, HR ditzes, the list is endless. Unless you are significantly older or were particularly adventuresome in your life, I likely have more experience in life than you do. And don&lsquo;t think this is bragging.I&lsquo;ve likely made infinitely worse mistakes than you have. Regardless, the point is you can benefit from my background and experiences, either where I succeeded or spectacularly failed. The only thing is...I&lsquo;m an asshole. Life has not been easy.Matter of fact it&lsquo;s been hell. I won&lsquo;t bore you with the details, but in short, I&lsquo;m burnt out. I&lsquo;m all out of patience.I&lsquo;m done. I no longer have the capacity to sit there with that soulless suit smile on my face, listening to middle age morons blather, and mindlessly nod my head. Ergo, when I see the solution to a problem or a way to capitalize on an opportunity I&lsquo;m not going to sit there silently, waiting for the appropriate moment to bring it to the attention of my boss.I&lsquo;m going to come outright and say it, &lsquo;HEY! DUMBASS!!!! The reason for your high employee turnover is because you don&lsquo;t train them for shit.&lsquo; &lsquo;HEY! FATASS!!! The reason girls won&lsquo;t go out with you is because you&lsquo;re fat. Lose the fucking weight!&lsquo; &lsquo;HEY! DIPSHIT!!!! What the hell is wrong with you letting your kid major in some worthless degree AND YOU PAY FOR IT???&lsquo; There&lsquo;s too damn many stupid people in this world, and acting like they&lsquo;re all geniuses in the hopes of contracting future business is not my cup of tea.I call it like I see it and it would be wise counsel to listen to me.</p>
        <motion.div variants={parent} className="socials">
            <Link href="https://assholeconsulting.com/"><FontAwesomeIcon icon={faHome} /> </Link>
            <Link href="https://www.youtube.com/@AaronClarey"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/clareyaaron/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/aaron_clarey"><FontAwesomeIcon icon={faTwitter} /> </Link>
        </motion.div>
    </>),
    Jack: (<><p>Jack Napier is a forklift certification specialist, Dutch fitness coach, and podcaster who focuses on having a good time in life in general and also with women. He offers gumroad course coaching, audiobook reading, and general Twitter entertainment for the manosphere. </p>
        <motion.div variants={parent} className="socials">
            <Link href="https://www.youtube.com/@JackNapierKnows/"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/jacknapierknows/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/JackNapierKnows"><FontAwesomeIcon icon={faTwitter} /> </Link>
        </motion.div>
    </>),
    Fitch: (<><p>I&lsquo;m Jon Fitch. I&lsquo;m a coach, writer, and retired MMA world champ living in San Jose, California. I was born in the All-American city of Ft. Wayne, Indiana.  Super competitive from the start, I began wrestling and playing football at just 9 years old. My love of wrestling never went away and I found myself walking on to the wrestling team at Purdue University. Uninfluenced by people advising me down a “safe” path, I pursued a professional fighting career in 2002, which lasted 18 lengthy years.  And I ain&lsquo;t even tired yet. Since retiring from MMA, I have focused on raising my two amazing boys, Mason and Atlas. I&lsquo;ve also repurposed my fighter mindset into the workings of a serial entrepreneur through starting Fitch SMASH LLC and my one-on-one consulting and coaching services. I aspire to motivate men to reach their pinnacle, both physically and mentally. I work hard to create a community of purpose-driven men through my weekly podcast, Jon Fitch Knows Nothing and my men&lsquo;s group, SMASHSociety. </p>
        <motion.div variants={parent} className="socials">
            <Link href="https://jonfitch.net/"><FontAwesomeIcon icon={faHome} /> </Link>
            <Link href="https://www.youtube.com/@JonFitchSMASH"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/jonfitchsmash/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/jonfitchdotnet"><FontAwesomeIcon icon={faTwitter} /> </Link>
        </motion.div>
    </>),
    Rollo: (<><p> Sometimes called the "Godfather of the Red Pill", Rollo Tomassi has been a permanent fixture in the &lsquo;Manosphere&lsquo; for 20 years. With a focus on evolutionary psychology and objectivism, Rollo brings a pragmatic, nuts & bolts, approach to intersexual dynamics, men and women&lsquo;s innate natures and their effects on today&lsquo;s society. He is the author of the internationally best selling book series, The Rational Male. Published in 2013, the series&lsquo; first book, The Rational Male, has become the &lsquo;Bible of the Red Pill&lsquo;, positively impacting and saving men&lsquo;s lives worldwide. Since 2011 Rollo has been the essayist/blogger/owner of The Rational Male blog. He is the host of his own YouTube channel, The Rational Male and a rotating host/panelist of Rule Zero, a weekly men&lsquo;s issues show. Rollo is a frequent guest on the Fresh & Fit Podcast as well as the Rich Dad Podcast with Robert Kiyosaki. </p>
        <motion.div variants={parent} className="socials">
            <Link href="https://therationalmale.com/"><FontAwesomeIcon icon={faHome} /> </Link>
            <Link href="https://www.youtube.com/@RolloTomassi"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/rational_male/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/RationalMale"><FontAwesomeIcon icon={faTwitter} /> </Link>
            <Link href="https://linktr.ee/Rollo_Tomassi"><FontAwesomeIcon icon={faLink} /> </Link>
        </motion.div></>),
    Stirling: (<><p>Stirling Cooper (born 4th March 1987) is an Award Winning Australian Pornographic Actor. Born in rural Western Australia Stirling started off his Porn career in 2017 shooting for smaller studios based in Melbourne, Australia. He then moved to the United Kingdom and used his experience and connections to get his foot in the door in the British Porn industry, shooting for numerous studios throughout 2017 such as the notorious Fake Taxi, Dorcel and many more. His career started to really kick into gear in the beginning of 2018 when he shot his first scene for Brazzers in 2018 and after that was flown out to Budapest, Hungary to shoot for other MindGeek brands like Babes. He stayed in Europe for several months working between Budapest, Hungary and Prague, Czech Republic building a lot of momentum and gaining tremendous experience after being cast by big names like Rocco Siffredi and the FakeHub Network. Stirling&lsquo;s life prior to Porn wasn&lsquo;t exactly innocent either, he spent several years in Australia working as a High-Class Male Companion where he would ‘service&lsquo; wealthy business women and fulfill live cuckold fantasies for desiring couples. Prior to that line of work he was also involved in the Swinging scene and the PUA scene. Stirling now uses his wealth of experience as a professional sex machine to teach men how to improve their own sex lives and through his Youtube channel he also helps enlighten men on the virtues of living an unapologetically masculine life. “His nominations include 2018 UKAP Awards Best Male Newcoming, 2018 UKAP Awards Best Male Pornstar, 2019 AVN Awards Best Male Newcomer, 2019 AVN Awards Best Foreign Sex Scene, 2019 Urban X Awards Best Male Newcomer, 2021 AVN Awards Best Actor (Featurette), 2021 AVN Awards Best Supporting Actor, 2021 Xbiz Awards Best Sex Scene (Gonzo), 2022 AVN Awards Best Supporting Actor, 2022 AVN Awards Best Foursome/Orgy Sex Scene.” In 2020 he received the XRCO (X-Rated Film Critics Organization) Best New Male Stud Award and has received numerous award nominations already in his relatively short adult industry career. The next big step in Stirling&lsquo;s Porn career was to make waves in the USA and he made a big impact the moment he landed in 2019, being picked up by Kink.com as one of their regular male talents and receiving numerous award nominations in his first year in the American porn scene. He has fast become one of the most respected, reliable and sought-after male performers in the industry and his career in the USA continues to flourish. He has since shot for all the big name brands in the Adult Entertainment Industry such as Evil Angel, Naughty America, Brazzers, Babes, Digital Playground, Realty Kings, TeamSkeet, Kink, New Sensations, Wicked, HardX, EroticaX, ScoreGroup, Penthouse, Hustler, PureTaboo, Zero Tolerance, Bellesa, LustCinema, Devils Films, MissaX and PervCity.</p>
        <motion.div variants={parent} className="socials">
            <Link href="https://www.stirlingcooper.com/"><FontAwesomeIcon icon={faHome} /> </Link>
            <Link href="https://www.youtube.com/@StirlingCooper"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/cooperstirling/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/StirlingWisdom"><FontAwesomeIcon icon={faTwitter} /> </Link>
        </motion.div>
    </>),
    Rian: (<><p>I was a kid of divorce, sent to the ranch in western Canada. Former graphic designer, former 12 year naval veteran, former corporate professional, and currently one of the more controversial people on the internet. I write life because everyone is so afraid to be honest about theirs, so I do it for them. My entire first book is the anecdote, so this bio won&lsquo;t have spoilers. </p>
        <motion.div variants={parent} className="socials">
            <Link href="https://www.rianstone.com/"><FontAwesomeIcon icon={faHome} /> </Link>
            <Link href="https://www.youtube.com/@RianStone"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/_rian_stone/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/_Rian_Stone"><FontAwesomeIcon icon={faTwitter} /> </Link>
        </motion.div>
    </>),
    Thor: (<><p>Thor brings a lifetime of “Real Practical” Life experiences in a vast array of solutions to modern issues men and women face today. Fitness and longevity, becoming durable, relationships, handling your boss, learning a craft-skill to earn 200k a year,  become attractive to women, acquire new skills socially, save your marriage, or keep your girlfriend and much more. You must make the choice to lead in your life with out one ounce of fear and “Live the Dream”. I Give  Men and even a woman or two….  The mental weapons, and tool set to overcome and defeat life&lsquo;s stressors and challenges in order to construct and live the dream as is your birth right! </p>
        <motion.div variants={parent} className="socials">
            <Link href="https://www.becomedurable.com/"><FontAwesomeIcon icon={faHome} /> </Link>
            <Link href="https://www.youtube.com/@rpthor1259/featured"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/rp.thor/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/pill_thor"><FontAwesomeIcon icon={faTwitter} /> </Link>
            <Link href="https://linktr.ee/rpthor"><FontAwesomeIcon icon={faLink} /> </Link>
        </motion.div>
    </>),
    PaulBenjamin: (<><p>Paul is a world renown mindset, persuasion, sexual dynamics, and relationship expert. He is known for using a process called neuro behavioral conditioning to help people rapidly create lasting changes in their behaviors and emotional and mental states. He also runs elite coaching programs that teach how to read, persuade and lead others, and that help men have and be the best in dating, sex, and relationships. Clients who have changed their lives with Paul - A seven figure earning top tier entrepreneur recently divorced getting back into dating. - A 25 year old virgin with a speech impediment wanting to gain confidence and have girls in his life. - A blue check mark celebrity needing to remove toxic beliefs and behaviors and learn to better navigate the dating market. - A 27 year old professional athlete needing to overcome sexual dysfunction and improve sexual skill. - A 19 year old woman trying to overcome sexual anxiety and navigate the dating market as a young attractive female. - A pastor handling jealousy and anxiety over his wife&lsquo;s sexual past. - A doctor needing an image consultant for his brand, and for his dating apps. - A 28 year old man running a start up and wanting to increase his productivity and success. - A 42 year old single mom trying to overcome abusive relationship trauma and figure out how to avoid toxic patterns. - A married couple of 7 years trying to find that love and passion for each other that they once had. - A combat veteran learning to manage PTSD, depression, and get back into physical fitness. - A 37 year old man wanting to get his ex back, or move on from her. Paul has helped them create breakthroughs, and exceed their goals and expectations. Paul uses a multi-disciplined approach utilizing evolutionary psychology, biology, behavioral, traditional, and performance psychology to help people all over the world change their minds, relationships, and lives for the better. Paul&lsquo;s live and online events, courses, one-on-one consults, and products will help close the gap between where you are to where you want to be. </p>
        <motion.div variants={parent} className="socials">
            <Link href="https://www.apexmindset.net/"><FontAwesomeIcon icon={faHome} /> </Link>
            <Link href="https://www.youtube.com/@ApexMindset1"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/paul.apxmindset/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/apxmindset"><FontAwesomeIcon icon={faTwitter} /> </Link>
        </motion.div>
    </>),
    PaulBauer: (<><p>Paul Baur is a former US Navy Sailor turned podcaster. He runs the Come On Man Podcast on youtube and offers courses on gumroad as well as his network on Facebook. </p>
        <motion.div variants={parent} className="socials">
            <Link href="http://loa.comeonmanpod.com"><FontAwesomeIcon icon={faHome} /> </Link>
            <Link href="https://www.facebook.com/comeonmanpodcast"><FontAwesomeIcon icon={faFacebookF} /> </Link>
            <Link href="https://www.tiktok.com/@bestmenspod"><FontAwesomeIcon icon={faTiktok} /> </Link>
            <Link href="https://www.youtube.com/ComeOnManPodcast"><FontAwesomeIcon icon={faYoutube} /> </Link>
            <Link href="https://www.instagram.com/comeonmanpodcast/"><FontAwesomeIcon icon={faInstagram} /> </Link>
            <Link href="https://x.com/ComeOnManPOD"><FontAwesomeIcon icon={faTwitter} /> </Link>
        </motion.div>
    </>),
}


