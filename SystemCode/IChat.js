// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const IChatUrl = 'https://en.wikipedia.org/wiki/Institute_of_Systems_Science';
const flyerUrl = 'https://www.iss.nus.edu.sg/docs/default-source/2.0-Executive-Education/executive-education-flyer.pdf?sfvrsn=46';

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

/* Event Welcome: Initiate the conversation with Hi */
  function welcome(agent) {
    agent.add(`Hello! I am ISS Chatbot (IChat).  How may I help you?`);
    agent.add(new Card({
      title: `NUS ISS`,
      text: `Founded in 1981, the Institute of Systems Science (Abbreviation: ISS; Chinese: 新加坡国立大学系统科学院) at the National University of Singapore provides graduate education, executive education, consultancy and research services. Its objectives are to develop infocomm leaders, and to drive business and organisation innovation.`,
      buttonText: 'NUS ISS Wikipedia Page',
      buttonUrl: IChatUrl
    }));
    agent.add(`To answer enquiries related to ISS programs, courses, and related information`);
    agent.add(new Suggestion(`Tell me about Graduate Programmes`));
    agent.add(new Suggestion(`Tell me about Executive Education Programmes`));
    agent.add(new Suggestion(`Tell me about Stackable Certificate Programmes`));
  }

/* Fallback with three option buttons */
  function fallback(agent) {
    agent.add(`I'm sorry, can you try again? You can say "Tell me about Graduate Programmes" or click the following button to learn more.`);
    agent.add(new Suggestion(`Tell me about Graduate Programmes`));
    agent.add(new Suggestion(`Tell me about Executive Education Programmes`));
    agent.add(new Suggestion(`Tell me about Stackable Certificate Programmes`));
  }

/* Get programme names based on three options */
  function getISSProgrammeCategoryIntent(agent) {
    const catname = agent.parameters.categoryname;

    if (catname === `Graduate Programmes`) {
      agent.add(new Suggestion(`Graduate Diploma in Systems Analysis`));
      agent.add(new Suggestion(`Master of Technology in Digital Leadership`));
      agent.add(new Suggestion(`Master of Technology in Enterprise Business Analytics`));
      agent.add(new Suggestion(`Master of Technology in Intelligent Systems`));
      agent.add(new Suggestion(`Master of Technology in Software Engineering`));
    } else if (catname === `Executive Education Programmes`) {
      agent.add(`There are many courses in Executive Education Programmes. Questions related to Executive Education Programmes would be answered based on our Junior Knowledge System. It covers Course Overview, Key Takeaway, Target Audience, Prerequisites, Course Details, Fees & Loans and Certification. You are recommended to check the following Flyer and ask questions related to each NICF course.`);
      // to update once get reviewed in Q&A!!!
      agent.add(new Card({
        title: `Executive Education Flyer`,
        text: `Courses in each Executive Education Programme`,
        buttonText: 'Executive Education Flyer Page',
        buttonUrl: flyerUrl
      }));
      agent.add(`The following are some sample questions you can ask to get Junior Knowledge System answers.`);
      agent.add(new Suggestion(`What are price for the Machine Reasoning?`));
      agent.add(new Suggestion(`Can you give me an overview of Machine Reasoning?`));
      agent.add(new Suggestion(`What is the Machine Reasoning course key takeaway?`));
      agent.add(new Suggestion(`Who should attend Machine Reasoning course?`));
      agent.add(new Suggestion(`What are the Machine Reasoning course pre-requsites?`));
      agent.add(new Suggestion(`What will be covered in this Machine Reasoning course?`));
      agent.add(new Suggestion(`What are the certs obtained from Machine Reasoning course?`));
      agent.add(new Suggestion(`What are the Machine Reasoning course learning points?`));
      agent.add(`To get better experience, please try questions related to "Graduate Programmes".`);
    } else if (catname === `Stackable Certificate Programmes`) {
      agent.add(`There are 4 Stackable Certificate Programmes. The system related to this has not been built yet. \n
        To get better experience, please try questions related to "Graduate Programmes"(Senior System) or "Executive Education Programmes"(Junior System)`);
    }
    agent.add(`Alternatively, you can ask another question or say 'hi' to restart.`);
  }

/* Programme Reply */
  function selectGraduateProgrammeIntent(agent) {
    const pname = agent.parameters.programmename;
  //agent.setContext('ISSIntent', 7);

    agent.add(`You have selected, ${pname}.  Click below to know more.`);
    agent.add(new Suggestion(`Overview`));
    agent.add(new Suggestion(`Modules`));
    agent.add(new Suggestion(`Project & Internship`));
    agent.add(new Suggestion(`Fee & Loans`));
    agent.add(new Suggestion(`Admission & Application`));
    agent.add(new Suggestion(`Career Path`));
  }
  function getlevel1Intent(agent) {
    const plevel1 = agent.parameters.level1;
    let pastcontext = agent.getContext('selectgraduateprogrammeintent-followup');
    const pname = pastcontext.parameters.programmename;
    agent.add(`You have selected, ${pname} : ${plevel1}.`);

/* 1. Graduate Diploma in Systems Analysis Start */
    if (pname === `Graduate Diploma in Systems Analysis`) {
      if (plevel1 === `Overview`) {
        agent.add(new Suggestion(`Purpose`));
        agent.add(new Suggestion(`Next Intake Time`));
        agent.add(new Suggestion(`Duration`));
        agent.add(new Suggestion(`Application Deadline`));
        agent.add(new Suggestion(`Technical learning outcomes`));
        agent.add(new Suggestion(`Non-technical learning outcomes`));
      } else if (plevel1 === `Modules`) {
        agent.add(new Suggestion(`Methodology`));
        agent.add(new Suggestion(`Technology`));
        agent.add(new Suggestion(`Databases`));
        agent.add(new Suggestion(`Programming – C# Suite`));
        agent.add(new Suggestion(`Programming - Java Suite`));
        agent.add(new Suggestion(`Programming - Python Suite`));
        agent.add(new Suggestion(`Full stack Solution Development`));
        agent.add(new Suggestion(`Internet Application Development`));
        agent.add(new Suggestion(`Project Management`));
        agent.add(new Suggestion(`Mobile Solution Development`));
      } else if (plevel1 === `Project & Internship`) {
        agent.add(new Suggestion(`Summary`));
        agent.add(new Suggestion(`Objectives`));
        agent.add(new Suggestion(`Learning Outcomes`));
      } else if (plevel1 === `Fee & Loans`) {
        agent.add(`Singaporean: S$10,013.29\n Singapore Permanent Resident: S$15,663.29\n International Students with Service Obligation (only applicable till August 2019 intake): S$23,563.29\n International Students without Service Obligation: S$37,463.29`);
      } else if (plevel1 === `Admission & Application`) {
        agent.add(`Applicants must possess the following pre-requisites:\n
Bachelor's degree from a recognised university\n
Proficiency in the English Language (written and spoken)*\n
Some work experience preferred\n\n
(*) English Language Proficiency\n
Applicants who graduated from universities where English is not the medium of instruction should submit TOEFL (Test of English as a Foreign Language) or IELTS (International English Language Testing System) score as evidence of their proficiency in the English language.\n\n
TOEFL : Paper-based test (580) \n
             : Computer-based test (237)  \n
             : Internet-based test (85)\n
IELTS   : Result of 6.0\n
Note: Institution code of NUS-ISS for TOEFL is 2432\n\n
TOEFL and IELTS are only valid for five years after the test and the validity should not expire before the beginning of the application period for the coursework programme.\n
All applicants are required to take an aptitude test. Shortlisted applicants will also need to attend an interview. Foreigners are welcome to apply.`);
      } else if (plevel1 === `Career Path`) {
        agent.add(`There is opportunity in Singapore for most areas of IT. What you learn in terms of IT skills is not as important as what you do with it. It is the attitude and the ability to learn from mistakes, and to contribute back to the company that you work for that is likely to make more of a difference than specific IT skills.\n\n
There are two main paths for advancement in IT - either technical or management. Technical means you continue to deepen your technical area in a domain (such as system architecture, or software engineering, etc.) and you become an expert in those areas. The other is management, where you can focus on project management, outsourcing, etc.\n\n
Our internship companies often tell us that if we can give them good students as interns, it is very likely they will get a job offer at the end of the internship.\n\n
Upon graduation, you will be trained IT specialists and leaders in real-world operating environments, equipped with invaluable problem solving, solutioning, and critical thinking skills. This would make you highly sought-after candidates of dynamic and successful multi-national corporations and institutions.\n\n
Career Prospects:\n
Chief Information Officer\n
IT Department Director\n
IT Architect\n
Project Manager\n
IT Consultant\n
Systems Designer\n
Systems Programmer\n
Systems Analyst\n
Applications Engineer`);
      }/* 2. Master of Technology in Enterprise Business Analytics Start */
    } else if (pname === `Master of Technology in Enterprise Business Analytics`) {
      if (plevel1 === `Overview`) {
        agent.add(new Suggestion(`Purpose`));
        agent.add(new Suggestion(`Next Intake Time`));
        agent.add(new Suggestion(`Duration`));
        agent.add(new Suggestion(`Application Deadline`));
        agent.add(new Suggestion(`Learning outcomes`));
      } else if (plevel1 === `Modules`) {
        agent.add(new Suggestion(`Analytics Project Management and Delivery`));
        agent.add(new Suggestion(`Core Analytics Techniques`));
        agent.add(new Suggestion(`Customer Analytics`));
        agent.add(new Suggestion(`Big Data Processing`));
        agent.add(new Suggestion(`Practical Language Processing`));
        agent.add(new Suggestion(`Advanced Predictive Modelling Techniques`));
      } else if (plevel1 === `Project & Internship`) {
        agent.add(new Suggestion(`Summary`));
        agent.add(new Suggestion(`Objectives`));
        agent.add(new Suggestion(`Learning Outcomes`));
      } else if (plevel1 === `Fee & Loans`) {
        agent.add(`Full-time/Part-time\n
Singaporeans & SPR: S$19,951.22 to S$21,376.46\n
Singaporeans, SPR (without subsidies) & International Students: S$52,023.40 to S$56,774.20`);
      } else if (plevel1 === `Admission & Application`) {
        agent.add(`Applicants must possess the following pre-requisites:\n\n
Bachelor's degree preferably in Mathematics, Statistics, Econometrics, Management Science, Operational Research, Science or Engineering and a grade point average of at least B
Proficiency in the English Language (written and spoken)*\n
Have passed an entrance test\n
NUS-ISS may, at its discretion, accept GRE general test in lieu of NUS-ISS entrance test in genuine cases e.g. a candidate lives in a country where NUS-ISS does not administer entrance tests or candidate had valid reasons that prevented him/her from attending the NUS-ISS entrance test when it was administered
A sample of the entrance test can be found here\n
Preferably two years relevant working experience\n
IT, engineering and scientific professionals would make ideal candidates\n
Candidates with highly relevant degrees in Mathematics, Statistics, Econometrics, Management Science, Operational Research or similar, with consistently good academic records may be granted a work experience waiver\n
Have received a favourable assessment at admissions interview conducted by NUS-ISS\n\n
*English Language Proficiency\n\n
Applicants who graduated from universities where English is not the medium of instruction should submit TOEFL (Test of English as a Foreign Language) or IELTS (International English Language Testing System) score as evidence of their proficiency in the English language.\n
TOEFL\n\n
Paper-based test (580)\n
Computer-based test (237)\n
Internet-based test (85)\n\n
IELTS\n\n
Result of 6.0\n\n
Institution code of NUS-ISS for TOEFL is 2432\n
TOEFL and IELTS are only valid for five years after the test and the validity should not expire before the beginning of the application period for the coursework programme.`);
      } else if (plevel1 === `Career Path`) {
        agent.add(`Find your fit with new opened doors\n
There is opportunity in Singapore in almost all industries which are rapidly working towards digital transformation and data analytics sits in the heart of it. What you learn in terms of analytics skills is not as important as what you do with it. It is the attitude and the ability to learn from mistakes, and to contribute back to the company that you work for that is likely to make more of a difference than specific analytics skills.\n\n
There are two main paths for advancement in analytics - either technical or managerial. Technical means you continue to deepen your technical area in a domain (Finance, Government, Manufacturing, Telecom, Transportation, Technology companies etc.) and you become an expert data scientist in those areas. The other is managerial, where you can focus on designing solutions for clients (internal or external) to achieve their organization goals in the areas of profit maximization, automation or digitization.\n\n
Our internship companies often tell us that if we can give them good students as interns, it is very likely they will get a job offer at the end of the internship.\n\n
As an MTech EBAC graduate, you will be prepared for specialist, expert and leadership roles in enterprise business analytics to create business value through strategic use of data, visualisation methods, modelling techniques and frontline tools.\n\n
Career Prospects\n
Business Analytics Manager\n
Data Scientist and Architect\n
Business Analyst\n
Optimisation Strategy Consultant\n
Business Intelligence and Performance Management Consultant\n
Enterprise Intelligence Manager\n
Market Intelligence Analyst\n
CRM Data Analyst\n
Risk Analyst\n
Marketing Analyst\n
Big Data Analyst`);
      }/* 3. Master of Technology in Digital Leadership */
    } else if (pname === `Master of Technology in Digital Leadership`) {
      if (plevel1 === `Overview`) {
        agent.add(new Suggestion(`Purpose`));
        agent.add(new Suggestion(`Next Intake Time`));
        agent.add(new Suggestion(`Duration`));
        agent.add(new Suggestion(`Application Deadline`));
        agent.add(new Suggestion(`Learning outcomes`));
      } else if (plevel1 === `Modules`) {
        agent.add(new Suggestion(`Practice of Digital Business`));
        agent.add(new Suggestion(`Digital Transformation`));
        agent.add(new Suggestion(`Digital Leadership & People`));
        agent.add(new Suggestion(`Digital Leadership Capstone`));
      } else if (plevel1 === `Project & Internship`) {
        agent.add(new Suggestion(`Summary`));
        agent.add(new Suggestion(`Objectives`));
        agent.add(new Suggestion(`Learning Outcomes`));
      } else if (plevel1 === `Fee & Loans`) {
        agent.add(`Full-time (per semester)\n
Singaporeans & SPR: S$20,500.95\n
International Students: S$22,750.95\n\n
Pull-time (per semester)\n
Singaporeans & SPR: S$10,257.90\n
International Students: S$11,382.90`);
      } else if (plevel1 === `Admission & Application`) {
        agent.add(`Applicants must possess the following pre-requisites:\n
A bachelor’s degree from an accredited institution preferably in Science, Engineering, Computing, Business or a related discipline and a grade point average of at least B
A minimum of 5 years of full-time work relevant work experience after first degree\n
Presently holding a senior or management position\n
Demonstrate digital acumen and work exposure to digitalisation\n
Have the passion and potential to assume a digital leadership position\n
A passionate learner with an ambition to shape the future and the ability to make things happen\n
Demonstrate proficiency in English (written and spoken)*\n
Have received a favourable assessment at admissions interview conducted by NUS-ISS. Admission is on a competitive basis and preference will be given to applicants with related job experiences\n
*English Language Proficiency\n
Applicants who graduated from universities where English is not the medium of instruction should submit TOEFL (Test of English as a Foreign Language) or IELTS (International English Language Testing System) score as evidence of their proficiency in the English language.\n\n

TOEFL : Paper-based test (580)\n
             : Computer-based test (237)\n
             : Internet-based test (85)\n
IELTS   : Result of 6.0\n
Note: Institution code of NUS-ISS for TOEFL is 2432\n\n

TOEFL and IELTS are only valid for five years after the test and the validity should not expire before the beginning of the application period for the coursework programme.`);
      } else if (plevel1 === `Career Path`) {
        agent.add(`Our Master of Technology in Digital Leadership programme (MTech DL) focus on digital strategy and leadership. Aimed at seasoned professionals with the ambition to shape the future, you will get a solid grounding in digital business models, how tech-based innovations drive and transform a business. It will equip you to become a leader in business-technology strategy and digital transformation. You will acquire the necessary critical thinking, process and people skills to lead an organisation to thrive and harness the digital economy.\n\n
Career Prospects:\n
Chief Technology Officer\n
Chief Information Officer\n
Chief Digital Officer\n
IT Director\n
Strategic Digital Planning Director\n
Program Director\n
Digital Marketing Director`);
      }/* 4. Master of Technology in Intelligent Systems */
    } else if (pname === `Master of Technology in Intelligent Systems`) {
      if (plevel1 === `Overview`) {
        agent.add(new Suggestion(`Purpose`));
        agent.add(new Suggestion(`Next Intake Time`));
        agent.add(new Suggestion(`Duration`));
        agent.add(new Suggestion(`Application Deadline`));
        agent.add(new Suggestion(`Learning outcomes`));
      } else if (plevel1 === `Modules`) {
        agent.add(new Suggestion(`Intelligent Reasoning Systems`));
        agent.add(new Suggestion(`Pattern Recognition Systems`));
        agent.add(new Suggestion(`Intelligent Robotic Systems`));
        agent.add(new Suggestion(`Intelligent Sensing Systems`));
        agent.add(new Suggestion(`Intelligent Software Agents`));
        agent.add(new Suggestion(`Practical Language Processing`));
      } else if (plevel1 === `Project & Internship`) {
        agent.add(new Suggestion(`Summary`));
        agent.add(new Suggestion(`Objectives`));
        agent.add(new Suggestion(`Learning Outcomes`));
      } else if (plevel1 === `Fee & Loans`) {
        agent.add(`Full-time/Part-time\n
Singaporeans & SPR: S$20,939.90 to S$22,095.50\n
Singaporeans, SPR (without subsidies) & International Students: S$55,319.00 to S$59,171.00`);
      } else if (plevel1 === `Admission & Application`) {
        agent.add(`Bachelor's degree preferably in Science or Engineering and a grade point average of at least B\n
Proficiency in the English Language (written and spoken)*\n
Have passed an entrance test\n
NUS-ISS may, at its discretion, accept GRE general test in lieu of NUS-ISS entrance test in genuine cases e.g. a candidate lives in a country where NUS-ISS does not administer entrance tests or candidate had valid reasons that prevented him/her from attending the NUS-ISS entrance test when it was administered\n
Preferably four years relevant working experience\n
as a software engineer e.g. programmer, designer, technical team lead\n
Candidates who have lesser than four years relevant experience with good practical software engineering knowledge gained either through course work, course projects or work experience may be considered\n
Have received a favourable assessment at admissions interview conducted by NUS-ISS\n
Applicants who graduated from universities where English is not the medium of instruction should submit TOEFL (Test of English as a Foreign Language) or IELTS (International English Language Testing System) score as evidence of their proficiency in the English language.\n
Institution code of NUS-ISS for TOEFL is 2432\n
TOEFL and IELTS are only valid for five years after the test and the validity should not expire before the beginning of the application period for the coursework programme.`);
      } else if (plevel1 === `Career Path`) {
        agent.add(`There is opportunity in Singapore for most areas of IT. What you learn in terms of IT skills is not as important as what you do with it. It is the attitude and the ability to learn from mistakes, and to contribute back to the company that you work for that is likely to make more of a difference than specific IT skills.\n\n
There are two main paths for advancement in IT - either technical or management. Technical means you continue to deepen your technical area in a domain (such as system architecture, or software engineering, etc.) and you become an expert in those areas. The other is management, where you can focus on project management, outsourcing, etc.\n\n
Our internship companies often tell us that if we can give them good students as interns, it is very likely they will get a job offer at the end of the internship.\n\n
As an MTech IS graduate, you will be trained to become an Artificial Intelligence and Knowledge Engineering and data analytics specialist, leading the development of Intelligent Systems to provide smart business solutions for organisations.
Career Prospects`);
      }/* 5. Master of Technology in Software Engineering */
    } else if (pname === `Master of Technology in Software Engineering`) {
      if (plevel1 === `Overview`) {
        agent.add(new Suggestion(`Purpose`));
        agent.add(new Suggestion(`Next Intake Time`));
        agent.add(new Suggestion(`Duration`));
        agent.add(new Suggestion(`Application Deadline`));
        agent.add(new Suggestion(`Learning outcomes`));
      } else if (plevel1 === `Modules`) {
        agent.add(new Suggestion(`Architecting Scalable Systems`));
        agent.add(new Suggestion(`Architecting Smart Systems`));
        agent.add(new Suggestion(`Designing and Managing Products and Platforms`));
        agent.add(new Suggestion(`Engineering Big Data`));
        agent.add(new Suggestion(`Securing Ubiquitous Systems`));
      } else if (plevel1 === `Project & Internship`) {
        agent.add(new Suggestion(`Summary`));
        agent.add(new Suggestion(`Objectives`));
        agent.add(new Suggestion(`Learning Outcomes`));
      } else if (plevel1 === `Fee & Loans`) {
        agent.add(`Full-time/Part-time\n
Singaporeans & SPR: S$17,981.35 to S$18,222.10\n
Singaporeans, SPR (without subsidies) & International Students: S$45,956.50 to S$46,759.00`);
      } else if (plevel1 === `Admission & Application`) {
        agent.add(`Bachelor's degree preferably in Science or Engineering and a grade point average of at least B\n
Proficiency in the English Language (written and spoken)*\n
Have passed an entrance test\n
NUS-ISS may, at its discretion, accept GRE general test in lieu of NUS-ISS entrance test in genuine cases e.g. a candidate lives in a country where NUS-ISS does not administer entrance tests or candidate had valid reasons that prevented him/her from attending the NUS-ISS entrance test when it was administered\n
Preferably four years relevant working experience
as a software engineer e.g. programmer, designer, technical team lead\n
Candidates who have lesser than four years relevant experience with good practical software engineering knowledge gained either through course work, course projects or work experience may be considered\n
Have received a favourable assessment at admissions interview conducted by NUS-ISS\n
Applicants who graduated from universities where English is not the medium of instruction should submit TOEFL (Test of English as a Foreign Language) or IELTS (International English Language Testing System) score as evidence of their proficiency in the English language.\n
Institution code of NUS-ISS for TOEFL is 2432\n
TOEFL and IELTS are only valid for five years after the test and the validity should not expire before the beginning of the application period for the coursework programme.`);
      } else if (plevel1 === `Career Path`) {
        agent.add(`There are opportunities in Singapore for most areas of IT. What you learn in terms of IT skills is not as important as what you do with it. It is the attitude and the ability to learn from mistakes, and to contribute back to the company that you work for that is likely to make more of a difference than specific IT skills.\n\n
There are two main paths for advancement in IT - either technical or management. Technical means you continue to deepen your technical area in a domain (such as system architecture, or software engineering, etc.) and you become an expert in those areas. The other is management, where you can focus on project management, outsourcing, etc.\n\n
Our internship companies often tell us that if we can give them good students as interns, it is very likely they will get a job offer at the end of the internship.\n\n
As an MTech SE graduate, you will be equipped with the essential knowledge and practical experience to architect, design, build and manage the delivery of robust software systems for organisations.\n
Career Prospects:\n
Software Architect (general, smart systems, data)\n
Senior Software Engineer\n
Data Architect\n
Product Manager`);
      }/* X1. Stackable Certificate Programmes */
    } else if (pname === `Stackable Certificate Programmes`) {
      agent.add(`There are 4 Stackable Certificate Programmes. It has not been built yet. \n
        To get better experience, please try questions related to "Graduate Programmes"(Senior System) or "Executive Education Programmes"(Junior System)`);
    } else if (pname === `Executive Education Programmes`) {
      agent.add(`There are many courses in Executive Education Programmes. Questions related to Executive Education Programmes would be answered based on our Junior Knowledge System. It covers Course Overview, Key Takeaway, Target Audience, Prerequisites, Course Details, Fees & Loans and Certification. You are recommended to check the following Flyer and ask questions related to each NICF course.`);
      // to update once get reviewed in Q&A!!!
      agent.add(new Card({
        title: `Executive Education Flyer`,
        text: `Courses in each Executive Education Programme`,
        buttonText: 'Executive Education Flyer Page',
        buttonUrl: flyerUrl
      }));
      agent.add(`The following are some sample questions you can ask to get Junior Knowledge System answers.`);
      agent.add(new Suggestion(`What are price for the Machine Reasoning?`));
      agent.add(new Suggestion(`Can you give me an overview of Machine Reasoning?`));
      agent.add(new Suggestion(`What is the Machine Reasoning course key takeaway?`));
      agent.add(new Suggestion(`Who should attend Machine Reasoning course?`));
      agent.add(new Suggestion(`What are the Machine Reasoning course pre-requsites?`));
      agent.add(new Suggestion(`What will be covered in this Machine Reasoning course?`));
      agent.add(new Suggestion(`What are the certs obtained from Machine Reasoning course?`));
      agent.add(new Suggestion(`What are the Machine Reasoning course learning points?`));
      agent.add(`To get better experience, please try questions related to "Graduate Programmes".`);
    }
    agent.add(`You may ask another question or say 'hi' to restart.`);

  }

  function getlevel2Intent(agent) {
    const plevel2 = agent.parameters.level2;
    let pastcontext = agent.getContext('selectgraduateprogrammeintent-followup');
    const pname = pastcontext.parameters.programmename;
    let pastcontext2 = agent.getContext('level1intent-followup');
    const plevel1 = pastcontext.parameters.level1;

    agent.add(`You have selected, ${pname} : ${plevel1} : ${plevel2}.`);
    if (pname === `Graduate Diploma in Systems Analysis`) {
      if (plevel1 === `Overview`) {
        if (plevel2 === `Purpose`) {
          agent.add(`The Graduate Diploma in Systems Analysis programme (GDipSA) is designed for non-IT graduates intending to craft a new career path in the IT industry. IT graduates and professionals who wish to advance their careers in their current field and recognise the need to equip themselves with the latest IT knowledge and skills to stay relevant may apply as well.`);
        } else if (plevel2 === `Next Intake Time`) {
          agent.add(`August 2019 (Full-time)`);
        } else if (plevel2 === `Duration`) {
          agent.add(`Full-time 1 year`);
        } else if (plevel2 === `Application Deadline`) {
          agent.add(`15 April 2019 (For International Applications)
30 April 2019 (For Local Applications)`);
        } else if (plevel2 === `Technical learning outcomes`) {
          agent.add(`Gather user requirements\n
Systematically analyse and design feasible IT solutions\n
Select the right technology\n
Code, test and implement proposed solutions\n
Trouble-shoot problems`);
        } else if (plevel2 === `Non-technical learning outcomes`) {
          agent.add(`Problem solving\n
Project management\n
Teamwork\n
Leadership`);
        }
      } else if (plevel1 === `Modules`) {
        if (plevel2 === `Methodology`) {
          agent.add(`Be guided to perform the tasks and produce the deliverables in the various phases of an application development life cycle taking into consideration of iOT, mobile and smart devices through on-the-job training in a project team. User experience design concepts and Web & Mobile user interface design concepts will also be covered.\n\n
Application Development Life Cycle`);
        } else if (plevel2 === `Technology`) {
          agent.add(`Be introduced to the various hardware and software components that make up a distributed computing infrastructure as the foundation to cloud computing.Distributed Computing Infrastructure`);
        } else if (plevel2 === `Databases`) {
          agent.add(`Learn the functions and purposes of databases in IT applications as well as the role and importance of SQL as a database manipulation, definition and control language. SQL Programming with consideration of Big Data`);
        } else if (plevel2 === `Programming – C# Suite`) {
          agent.add(`Build the foundation for programming which is an essential skill for the designing and developing of system of records.\n
Fundamentals of Programming using C#\n
Object Oriented Programming using C#\n
User Interface Development with Visual Studio.NET and C#\n
Developing Enterprise Systems with .NET Framework\n
Designing Internet application using ASP.NET\n
Crafting the mobile-friendly user interface tailored for Internet platform\n
Internet programming with Microsoft .NET Framework`);
        } else if (plevel2 === `Programming - Java Suite`) {
          agent.add(`Introducing Web development using Java as the vehicle with consideration of data analytics which a characteristic of system of engagement.\n
Java Programming\n
Web application design using Java\n
Synchronous and asynchronous web stack using SpringBoot\n
Client side programming using React.js\n
Big data analytics using Sprint Cloud Data Flow.`);
        } else if (plevel2 === `Programming - Python Suite`) {
          agent.add(`Introducing system of insights using Python programming as the vehicle with consideration machine learning. Python programming: Integrating and using machine learning in system of insights`);
        } else if (plevel2 === `Full stack Solution Development`) {
          agent.add(`Understand the development of web application using open source platform.  Programming with JAVAScript, AngularJS and NodeJS `);
        } else if (plevel2 === `Internet Application Development`) {
          agent.add(`Perform web application development using ASP.NET development platform.\n\n
Designing Internet application\n
Crafting the mobile-friendly user interface tailored for Internet platform\n
Internet programming with Microsoft .NET Framework `);
        } else if (plevel2 === `Project Management`) {
          agent.add(`Learn the various types of IT professions and the organisation structure of a typical company’s IT department. Concepts from agile to DevOps to continuous delivery will also be introduced.\n\n
Roles and Responsibilities\n
Project Planning and Control\n
Change Management and Control`);
        } else if (plevel2 === `Mobile Solution Development`) {
          agent.add(`Grasp mobile application development using HTML5 for Mobile Web and Android for Native App.\n\n
Designing mobile applications\n
Crafting the mobile user interface\n
Programming on HTML5 programming for Mobile Web and Android programming for Native App`);
        }
      } else if (plevel1 === `Project & Internship`) {
        if (plevel2 === `Summary`) {
          agent.add(`The 5-month internship is a crucial and prized component of the GDipSA programme. Here, students are assigned to companies to work in real-life settings. Students develop the versatility and flexibility to handle the unpredictable challenges of user requirements, project schedules and end-product expectations of any real-life project. They will learn to adapt quickly to new working cultures, pick up new technical skills and domain knowledge where required, and propose feasible IT solutions, develop and deliver them to the satisfaction of users.`);
        } else if (plevel2 === `Objectives`) {
          agent.add(`Projects and internships provide opportunities for students to put into practice what you have learnt in the classroom, making your ideas come to life in the real-world.`);
        } else if (plevel2 === `Learning Outcomes`) {
          agent.add(`Adapt quickly to new working cultures\n
Pick up new technical skills and domain knowledge where required\n
Propose feasible IT solutions, develop it, and deliver them to the satisfaction of users`);
        }
      }
    } else if (pname === `Master of Technology in Enterprise Business Analytics`) {
      if (plevel1 === `Overview`) {
        if (plevel2 === `Purpose`) {
          agent.add(`The NUS Master of Technology in Enterprise Business Analytics programme (MTech EBAC) is specifically designed to meet the industry demand for data scientists who can help organisations achieve improved business outcomes through data insights. It is best suited for professionals seeking to focus on the following - methodical data exploration and visualisation, diagnostic analytics, predictive modelling using statistical and machine learning techniques, text analytics, recommender systems, and big data engineering, etc.\n\n
The MTech EBAC programme prepares students for specialist, expert and leadership roles in enterprise business analytics to create business value through strategic use of data, analytics, models and frontline tools.\n\n
By contributing to more effective utilisation and management of data analytics, you can help your enterprise to focus on big decisions so that they gain better predictive ability that can translate to higher profits. Helping enterprises to build better and more effective models will lead to improved outcomes such as more attractive pricing, higher levels of customer care, better market segmentation, and highly-efficient inventory management and finally profit maximization.`);
        } else if (plevel2 === `Next Intake Time`) {
          agent.add(`Jan 2020 (Part-time)`);
        } else if (plevel2 === `Duration`) {
          agent.add(`Full-time 1 year (2 semesters)\n
Part-time 2 years (4 semesters)`);
        } else if (plevel2 === `Application Deadline`) {
          agent.add(`15 September 2019  (Application starts on 1 June 2019) `);
        } else if (plevel2 === `Learning outcomes`) {
          agent.add(`Help enterprises move towards a stronger emphasis on computer tools and statistical and machine learning techniques to develop high-performance analytics capability\n\n
Translate massive and complex unstructured data (e.g.: text) into insights\n\n
Produce predictive models to solve a broad range of problems across various business functions and units\n\n
Contribute to the development of more effective business strategies and plans for sustainable growth and competitive advantage`);
        }
      } else if (plevel1 === `Modules`) {
        if (plevel2 === `Analytics Project Management and Delivery`) {
          agent.add(`Students will be equipped with practice-oriented data analytics skills and knowledge in managing analytics project.
Participants will be equipped with essential skillsets to understand analytics processes and best practices, to manage data and resources, to uphold data governance, to understand structure of analytics solution, to perform data visualisation, to present insights via compelling data storytelling, and to ensure successful implementation of analytics project.\n\n 
Courses:\n
Data Analytics Process and Best Practices\n
Data Storytelling\n
Data Governance & Protection\n
Managing Business Analytics Projects`);
        } else if (plevel2 === `Core Analytics Techniques`) {
          agent.add(`Students will learn the foundation skills to understand, design and solve analytics problems in the industry involving structured and unstructured data. It is a course which prepares the participants to embark upon the journey to become a data scientist in due course. \n\n
Courses:\n
(Data Analytics Process and Best Practices)\n
Statistics Bootcamp\n
Predictive Analytics – Insights of Trends and Irregularities\n
Text Analytics\n
Recommender Systems`);
        } else if (plevel2 === `Customer Analytics`) {
          agent.add(`Students will be equipped with the skills to manage the customer data and build analytics solutions for customer relationship management. The course will enable them to apply techniques for targeted customer marketing, to reduce churn, increase customer satisfaction and loyalty and increase profitability.\n\n
Courses:\n
Customer Analytics\n
Advanced Customer Analytics\n
Campaign Analytics`);
        } else if (plevel2 === `Big Data Processing`) {
          agent.add(`Students will learn various aspects of data engineering while building resilient distributed datasets. Participants will learn to apply key practices, identify multiple data sources appraised against their business value, design the right storage, and implement proper access model(s). Finally, participants will build a scalable data pipeline solution composed of pluggable component architecture, based on the combination of requirements in a vendor/technology agnostic manner. Participants will familiarize themselves on working with Spark platform along with additional focus on query and streaming libraries.\n\n
Courses:\n
Feature Engineering & Analytics using IoT Data\n
Graph & Web Mining\n
Big Data Engineering`);
        } else if (plevel2 === `Practical Language Processing`) {
          agent.add(`Students will be taught advanced skills in practical language processing. This includes fundamental text processing, text analytics, deep learning techniques and their application in sentiment mining and chatbots development.\n\n
Courses:\n
Text Analytics\n
New Media and Sentiment Mining\n
Text Processing using Machine Learning\n
Conversational Interfaces`);
        } else if (plevel2 === `Advanced Predictive Modelling Techniques`) {
          agent.add(`Students will be taught the advanced concepts of predictive modeling and Time Series Forecasting and their application in few special areas like Health Care & Service Industry in addition to other domains like Public Services, IT Services, Finance, Airlines, Logistics, Transport, Hotel & Tourism Industries. The topics include GLM, ARIMA & SARIMA, Transfer Functions, Survival Analysis, Image Analysis for Health Care, Management of Health & Medical Data, Service Quality Frame Work, Service Process Improvement Techniques etc.\n\n
Courses:\n
Service Analytics\n
Generalized Predictive Modeling & Forecasting\n
Health Analytics`);
        }
      } else if (plevel1 === `Project & Internship`) {
        if (plevel2 === `Summary`) {
          agent.add(`Student projects for MTech EBAC students will include intense full time engagement of 3 months with companies for full time students. For part-time students the internship engagement will be for 6-12 months. Students are allowed to conduct their project as a team-based internship if desired. The expected commitment for the project is 30 man-days per team member.`);
        } else if (plevel2 === `Objectives`) {
          agent.add(`Practise new technical skills in a real industry environment
Apply tools, methods and techniques learnt`);
        } else if (plevel2 === `Learning Outcomes`) {
          agent.add(`Apply business analytics methods and techniques to solve identified business problems\n
Plan and execute business analytics projects by understanding business problems, identifying appropriate analytics techniques, and then applying data exploration, model building, testing and validating of results`);
        }
      }
    } else if (pname === `Master of Technology in Digital Leadership`) {
      if (plevel1 === `Overview`) {
        if (plevel2 === `Purpose`) {
          agent.add(`This MTech DL programme that focus on digital strategy and leadership will equip students with the critical thinking, hard and soft skills to become an effective leader. It will accelerate their career and enhance one's ability to take on greater roles and responsibilities in digital leadership. Students will be equipped with the right processes and people capabilities to ride the digital wave and to thrive in the digital economy. Our goal is also to help organisations to develop its next generation of IT and digital leaders.`);
        } else if (plevel2 === `Next Intake Time`) {
          agent.add(`January 2020`);
        } else if (plevel2 === `Duration`) {
          agent.add(`Part-time 2 years (4 semesters)`);
        } else if (plevel2 === `Application Deadline`) {
          agent.add(`30 September 2019`);
        } else if (plevel2 === `Learning outcomes`) {
          agent.add(`Understand the practice of digital business models\n
Develop leadership skills to lead the digital journey and drive breakthrough change for organisation\n
Create effective plans to bring about digital transformation in the business for competitive advantage\n
Embrace strategic thinking, innovation and effective communication`);
        }
      } else if (plevel1 === `Modules`) {
        if (plevel2 === `Practice of Digital Business`) {
          agent.add(`Learn what is digital business and the different models of digital transformation and innovation. Analyse business models of platforms and software disruptors with case studies from diverse industries and how digital business create, deliver, capture and defend value. Understand digital agility and change imperatives for competitive advantage. Explore what are the emerging trends and the underlying economics of market disruptions, innovation and technologies\n\n
Courses:\n
Digital Organisation Models\n
Digital Agility & Change Leadership\n
Innovation by Design`);
        } else if (plevel2 === `Digital Transformation`) {
          agent.add(`Embark on the journey to create and transform into digital business. Analyse through strategic thinking and foresight what transformation means for the business, what drives innovation by design and what it takes to win in a digital age. Use relevant frameworks to identify key areas to transform including integrated strategy, core processes and enabling technologies. Understand practical approaches to move from a legacy to a digital business. Learn the “how-to” with design of product portfolio, operating model and digital architecture.\n\n
Courses:\n
Strategic Thinking & Foresight\n
Digital Business Strategy\n
Mastering Digital Architecture`);
        } else if (plevel2 === `Digital Leadership & People`) {
          agent.add(`Develop leaders with strategic thinking and team building skills. Understand the type of talents, competencies and capabilities needed to lead a cross organisational digital business strategy and transformation effort. Develop the compact needed to establish and support high performance transformation team and to sustain the digital culture. Learn about leadership and challenges in managing complexity and digital governance.\n\n
Courses:\n
Talent & Leadership Pathways\n
Managing Digitalisation Complexity\n
Digital Governance`);
        } else if (plevel2 === `Digital Leadership Capstone`) {
          agent.add(`A highlight of the programme is the 9-month Digital Leadership Capstone project that brings together all the disciplines that students have encountered in the programme. Students reflect, apply and synthesise the knowledge, skills and techniques that they have learnt in class and apply to a real-life organisation. They will integrate what they have learnt with how they, as the Digital Leader, will have to perform digital business transformation and solve real-world problems for a target organisation. Students will work in groups and are mentored by industry advisors to deliver the capstone project.`);
        }
      } else if (plevel1 === `Project & Internship`) {
        if (plevel2 === `Summary`) {
          agent.add(`Will extend over a period of 9 months for part-time students. Students will work in groups to perform the capstone project, with an expected student commitment of 40 man-days per team member.`);
        } else if (plevel2 === `Objectives`) {
          agent.add(`Bring together all disciplines encountered in the programme
Apply knowledge, skills and techniques learnt in class to a real-life environment`);
        } else if (plevel2 === `Learning Outcomes`) {
          agent.add(`Progressively compile a portfolio of observations, findings and recommendations on the target company/organisation
Demonstrate the ability to present and communication final recommendations at the executive level`);
        }
      }
    } else if (pname === `Master of Technology in Intelligent Systems`) {
      if (plevel1 === `Overview`) {
        if (plevel2 === `Purpose`) {
          agent.add(`The NUS Master of Technology in Intelligent Systems programme is targeted at working professionals who wish to be able to design and build systems that utilise Artificial Intelligence and other Smart Systems techniques. Application areas are wide and diverse, and include robotics, autonomous vehicles, intelligent sensing systems, Internet of Things, Smart City applications and Industry 4.0 applications, as well as applications within business and commerce.\n\n
The MTech IS programme emphasises the concepts, techniques and methods of Artificial Intelligence, and their application to the development of Intelligent Systems applications. The programme provides you with the essential knowledge and practical experience needed to become an Artificial Intelligence and Intelligent Systems specialist, and prepares you to be able to lead the development of Intelligent Systems in providing effective and optimal business solutions for your organisation.`);
        } else if (plevel2 === `Next Intake Time`) {
          agent.add(`Jan 2020 (Part-time)`);
        } else if (plevel2 === `Duration`) {
          agent.add(`Full-time 1 year (2 semesters)\n
Part-time 2 years (4 semesters)`);
        } else if (plevel2 === `Application Deadline`) {
          agent.add(`15 September 2019  (Application starts on 1 June 2019) `);
        } else if (plevel2 === `Learning outcomes`) {
          agent.add(`Apply Intelligent Systems concepts, techniques and methods to solve varied problems across multiple domains including: business, manufacturing, engineering, heathcare etc.\n\n
Lead the development of Intelligent Systems using contemporary tools and techniques, including Artificial Intelligence, Machine Learning, Prediction, Forecasting, Classification, Clustering and Optimisation\n\n
Design and customise algorithms to solve complex business problems and create strategic advantage`);
        }
      } else if (plevel1 === `Modules`) {
        if (plevel2 === `Intelligent Reasoning Systems`) {
          agent.add(`Students will be taught how to build Intelligent Systems that solve problems by computational reasoning using captured domain knowledge and data. Example applications include, question answering systems such as IBM's Watson, personal assistants such as Amazon’s Alexa Skills and game-playing systems such as Google's AlphaGo `);
        } else if (plevel2 === `Pattern Recognition Systems`) {
          agent.add(`Students will be taught how to design and build systems that make decisions by recognising complex patterns in data. Examples are robotic systems and smart city applications that take as input diverse sensor data streams. These systems will utilise the latest pattern recognition, machine learning and sensor signal processing techniques.`);
        } else if (plevel2 === `Intelligent Robotic Systems`) {
          agent.add(`Students will be taught the skills required to build Intelligent Systems that will help control the advanced robotic systems, autonomous vehicles and industrial automation that will be central to Industry 4.0`);
        } else if (plevel2 === `Intelligent Sensing Systems`) {
          agent.add(`Students will be taught the skills and techniques required to build Intelligent Sensing Systems that are able to make decisions based on visual and audio sensory signals, including human speech. Example systems include crowd monitoring, facial recognition, medical sensing, robot and vehicle control. `);
        } else if (plevel2 === `Intelligent Software Agents`) {
          agent.add(`Students will be taught how to build intelligent software agents that can act on behalf of, and replicate the actions of, humans in commercial and business transactions as well as automate business processes. Example systems include intelligent personal assistants, intelligent shopping agents as well as intelligent agents performing robotic process automation.`);
        } else if (plevel2 === `Practical Language Processing`) {
          agent.add(`Students will be taught advanced skills in practical language processing. This includes fundamental text processing, text analytics, deep learning techniques and their application in sentiment mining and chatbots development. `);
        }
      } else if (plevel1 === `Project & Internship`) {
        if (plevel2 === `Summary`) {
          agent.add(`Student projects for MTech IS students extend over a period of three months for full-time students and one year for part-time students. Full-time students are allowed to conduct their project as a team-based internship if desired. The expected commitment for the project is 60 man-days per team member.`);
        } else if (plevel2 === `Objectives`) {
          agent.add(`Acquire hands-on experience in defining and analysing the knowledge and data requirements of real-world business problems
Plan and strategise high-value intelligent systems projects to provide identifiable benefits to the internship company
Design, develop and implement Intelligent Systems through the effective use of Artificial Intelligence and Knowledge Engineering tools and techniques`);
        } else if (plevel2 === `Learning Outcomes`) {
          agent.add(`Conduct requirements analysis using a structured approach
Produce high-quality intelligent systems following industry best practices and methodologies
Proficient in the use of knowledge and data engineering tools and techniques to deliver optimal business value`);
        }
      }
    } else if (pname === `Master of Technology in Software Engineering`) {
      if (plevel1 === `Overview`) {
        if (plevel2 === `Purpose`) {
          agent.add(`The NUS Master of Technology in Software Engineering is designed to meet the industry demand for software engineers who can help Singapore organisations to realise the smart nation initiatives through building robust, reliable and scalable software systems. This programme is best suited for individuals who have a few years of experience in software engineering roles and are looking to further enhance their knowledge and skills in architecting scalable, secure and smart software systems.\n\n
The MTech SE programme emphasises the skills required for architecting scalable, secure and smart systems and platforms. The focus will also be exploitation of software technologies, methodologies and management techniques. It focuses on the practical and systematic construction of software systems, using innovative and state-of-the-art techniques.\n\n
The programme will equip you with the essential knowledge and practical experience to architect, design, build and manage the delivery of robust software systems for your organisation and customers.\n
Career Prospects:\n
Artificial Intelligence Specialist\n
Machine Learning Specialist\n
Intelligent Systems Specialist\n
Robotic Systems Developers\n
Autonomous Vehicle Systems Developers\n
Vision and Sensing Systems Developers\n
A.I. Business System Developers\n
Intelligent Process Automation Developers\n
Intelligent Healthcare System Developers\n
Smart City Applications Developers\n
Language System Engineers\n
Text Mining / Analytics Specialist\n
Big Data Developers\n
Games Developers`);
        } else if (plevel2 === `Next Intake Time`) {
          agent.add(`Jan 2020 (Part-time)`);
        } else if (plevel2 === `Duration`) {
          agent.add(`Full-time 1 year (2 semesters)
Part-time 2 years (4 semesters)`);
        } else if (plevel2 === `Application Deadline`) {
          agent.add(`15 September 2019  (Application starts on 1 June 2019)`);
        } else if (plevel2 === `Learning outcomes`) {
          agent.add(`Become software architects capable of architecting and designing systems that exploit major contemporary software platforms, technologies and methodologies\n
Become software architects capable of architecting and designing smart and secure systems\n
Become data architects equipped with data engineering skills to engineer big data from a variety of sources`);
        }
      } else if (plevel1 === `Modules`) {
        if (plevel2 === `Architecting Scalable Systems`) {
          agent.add(`Students will learn how to architect scalable, robust and reliable ubiquitous systems using the latest Butt-based technology. Techniques to automate and engineer DevOps pipelines and architecting platforms will also be covered. Students will also focus on how to architect the back-end support for large systems and platforms. `);
        } else if (plevel2 === `Architecting Smart Systems`) {
          agent.add(`Students will learn skills and techniques required to engineer end-to-end Intelligent Smart Systems. Topics in architecting smart IoT platforms and systems that are scalable will be covered. Students will learn to design, develop and integrate systems that make sense of data from a variety of sensors and edge devices. Students will also learn to create interfaces to smart systems that are apt for interacting with humans in intelligent manners. `);
        } else if (plevel2 === `Designing and Managing Products and Platforms`) {
          agent.add(`Students will learn how to design and manage software products and platforms. The key components include using design thinking principles and market research to innovate and concretize product ideas; a framework to scaffold the multidisciplinary aspects of managing a product; develop a product strategy that aligns with business goals and to architect a platform business model from first principles. Students can expect a hands-on approach, engaging class dialogues, lectures and offline study. Valuable insights will be shared by industry practitioners. `);
        } else if (plevel2 === `Engineering Big Data`) {
          agent.add(`Students will learn various aspects of data engineering and processes required for building resilient distributed datasets. Students will also learn to apply key practices, identify multiple data sources appraised against their business value, design the right data storage model(s), and implement fitting data access patterns. Finally, Students will build a scalable data pipeline composed of pluggable functional compute components based on the business insight requirements in a vendor/technology agnostic manner. Students will work with Spark and Hadoop framework along with detailed focus on graph, ML, query and streaming libraries. `);
        } else if (plevel2 === `Securing Ubiquitous Systems`) {
          agent.add(`Students will be equipped with skills to design and manage cyber security for ubiquitous systems that need to be highly secure . Students will learn about cyber security and its application in securing mobile systems and software platforms. Students will also learn how to incorporate security during the software development lifecycle. `);
        }
      } else if (plevel1 === `Project & Internship`) {
        if (plevel2 === `Summary`) {
          agent.add(`Student projects for MTech SE students extend over a period of 3 months for full-time students and one year for part-time students. Full-time students are allowed to conduct their project as a team-based internship if desired. The expected commitment for the project is 45 man-days per team member.`);
        } else if (plevel2 === `Objectives`) {
          agent.add(`Architect, design and develop a real-world software system\n
Demonstrate technical and management skills by documenting various aspects of the system development and on-time delivery of quality systems.\n
Deliver a fully-tested system that fulfils the requirements of the sponsoring company`);
        } else if (plevel2 === `Learning Outcomes`) {
          agent.add(`Manage a software development project following a formal approach\n
Engineer software systems using appropriate software engineering methods and construction technologies\n
Apply project and quality management techniques to deliver a robust solution that meets user requirements`);
        }
      }
    }

    agent.add(`You may ask another question or say 'hi' to restart.`);

  }

  function getCourseMoreDetails(agent) {
    const moredetails = agent.parameters.moreDetails;
    let pastcontext = agent.getContext('issintent');
    const coursename = pastcontext.parameters.Coursename;
    agent.add(`You have selected ${coursename}.  ${moredetails}.`);

    agent.add(new Suggestion(`Cancel`));
  }
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('ISSProgrammeCategoryIntent', getISSProgrammeCategoryIntent);
  intentMap.set('selectGraduateProgrammeIntent', selectGraduateProgrammeIntent);
  intentMap.set('level1Intent', getlevel1Intent);
  intentMap.set('level2Intent', getlevel2Intent);
  intentMap.set('getCourseMoreDetails', getCourseMoreDetails);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});