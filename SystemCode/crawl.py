#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed May  8 21:40:52 2019

@author: rsp
"""
import requests, re
import urllib.request as urllib
import html2text


#url = ["https://www.iss.nus.edu.sg/executive-education"]
url = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/cybersecurity"]
url1 = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/machine-reasoning/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/reasoning-systems/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/problem-solving-using-pattern-recognition/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/intelligent-sensing-and-sense-making/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/pattern-recognition-and-machine-learning-systems/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/vision-systems/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/spatial-reasoning-from-sensor-data/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/new-media-and-sentiment-mining-new/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--text-analytics-(sf)/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/text-processing-using-machine-learning/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/text-processing-using-machine-learning/artificial-intelligence",
"https://www.iss.nus.edu.sg/executive-education/course/detail/robotic-systems/artificial-intelligence"]
url2 = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--aisp-qualified-information-security-professional-course-(sf)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--securing-iot-(sf)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--design-secure-mobile-architecture-(sf)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--design-secure-mobile-architecture-ssdla-sf/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--design-secure-mobile-architecture-ssdla-sf/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--(isc)-ccsp-cbk-training-seminar-(sf)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--(isc)-cissp-cbk-training-seminar-(sf)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--cybersecurity-risk-awareness-(sf)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--managing-cybersecurity-risk-(sf)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--cyber-security-for-ict-professionals-(sf)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--(isc)-csslp-cbk-training-seminar-(sf)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-secure-software-lifecycle-professional-(csslp-exam-only)-/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-information-systems-security-professional--(cissp-exam-only)/cybersecurity",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-cloud-security-professional-(ccsp-exam-only)/cybersecurity"]
url3 = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--data-analytics-process-and-best-practice-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--data-storytelling-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--statistics-for-business-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--data-driven-decision-making-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--managing-business-analytics-projects-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--data-governance-protection-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--data-analytics-process-and-best-practice-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--statistics-bootcamp-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--data-driven-decision-making-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--predictive-analytics---insights-of-trends-and-irregularities-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--text-analytics-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--recommender-systems-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--customer-analytics-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf-campaign-analytics-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--advanced-customer-analytics-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--big-data-engineering-for-analytics-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--feature-engineering-and-analytics-using-iot-data-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/new-media-and-sentiment-mining-new/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--text-analytics-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/text-processing-using-machine-learning/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--health-analytics_(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf-service-analytics-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--web-analytics-seo-(sf)/data-science",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--social-media-analytics-(sf)/data-science"]
url4 = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-scrum-product-owner-/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf-business-agility-bootcamp/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--certified-scrummaster-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--pmi-agile-certified-practitioner-(pmi-acp)-preparatory-course-acp-sf/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--certified-less-practitioner---principles-to-practices-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--agile-testing-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--essential-practices-for-agile-teams-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--business-analysis-for-agile-practitioners-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf---lean-it-foundation-certification-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--devops-foundation-with-bizops-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--itil-foundation-certificate-in-it-service-management-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/-nicf--itil%C3%A2-continual-service-improvement-certificate-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--itil-operational-support-and-analysis-certificate-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--itil-release-control-and-validation-certificate-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--itil-service-offerings-and-agreements-certificate-(sf)/digital-agility",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--systems-thinking-root-cause-analysis-(sf)/digital-agility"]
url5 = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/digital-innovation-design",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--innovation-bootcamp-(sf)/digital-innovation-design",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--strategic-design-innovation-(sf)/digital-innovation-design",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--service-design-(sf)/digital-innovation-design",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--technopreneurship-(sf)/digital-innovation-design",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--digital-user-experience-design-(sf)/digital-innovation-design",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--mobile-user-experience-design-(sf)/digital-innovation-design",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--web-analytics-seo-(sf)/digital-innovation-design",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--digital-social-engagement-strategy-(sf)/digital-innovation-design",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--social-media-analytics-(sf)/digital-innovation-design"]
url6 = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--communicating-and-managing-change-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--strategic-futures-foresight-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--digital-transformation-planning-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--innovation-bootcamp-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--data-driven-decision-making-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-scrum-product-owner-/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-business-analysis-professional-(cbap)-preparatory-course/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf-business-agility-bootcamp/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--business-analysis-for-agile-practitioners-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--business-process-reengineering-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--strategic-business-analysis-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--enterprise-architecture-masterclass-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf---enterprise-architecture-practicum---aop-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--enterprise-architecture-practicum-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--certified-enterprise-architecture-practitioner-course-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--aisp-qualified-information-security-professional-course-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--securing-iot-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--design-secure-mobile-architecture-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--design-secure-mobile-architecture-ssdla-sf/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--cobit-5-foundation-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--(isc)-ccsp-cbk-training-seminar-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--(isc)-cissp-cbk-training-seminar-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--cybersecurity-risk-awareness-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--managing-cybersecurity-risk-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--cyber-security-for-ict-professionals-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--(isc)-csslp-cbk-training-seminar-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--data-governance-protection-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--enterprise-digital-governance-(sf)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/e-government/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf-specialist-diploma-in-enterprise-architecture/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-cloud-security-professional-(ccsp-exam-only)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-information-systems-security-professional--(cissp-exam-only)/digital-strategy-leadership",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-secure-software-lifecycle-professional-(csslp-exam-only)-/digital-strategy-leadership"]
url7 = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--strategic-product-manager-(sf)/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--digital-product-strategy-(sf)/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--product-thinking-for-organisations-(sf)/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--strategic-product-market-fit-(sf)/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--pmp-for-project-managers-(sf)/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--pmi-agile-certified-practitioner-(pmi-acp)-preparatory-course-acp-sf/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--prince2-(projects-in-controlled-environments)---foundation-and-practitioner-certificate-(sf)/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/certified-scrum-product-owner-/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--certified-scrummaster-(sf)/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--managing-business-analytics-projects-(sf)/digital-products-platforms",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--communicating-and-managing-change-(sf)/digital-products-platforms"]
url8 = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nus-iss-certificate-in-digital-solutions-development-design-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nus-iss-certificate-in-digital-solutions-development-foundations-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nus-iss-certificate-in-digital-solutions-development-web-applications-sa4105-sf/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nus-iss-certificate-in-digital-solutions-development---mobility-applications-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nus-graduate-diploma-in-systems-analysis-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--essential-practices-for-agile-teams-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--agile-testing-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--designing-cloud-enabled-mobile-applications-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--object-oriented-analysis-design-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--object-oriented-design-patterns-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf---cloud-native-solution-design-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/platform-engineering-SF/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/devops-engineering-and-automation-SF/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--architecting-software-solutions-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--strategic-product-manager-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--service-design-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--digital-product-strategy-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--big-data-engineering-for-analytics-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--envisioning-smart-urban-iot-solutions-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--developing-smart-urban-iot-solutions-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--securing-iot-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/humanizing-smart-systems-SF/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--architecting-iot-solutions-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/designing-intelligent-edge-computing-SF/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--design-secure-mobile-architecture-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--design-secure-mobile-architecture-ssdla-sf/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--(isc)-cissp-cbk-training-seminar-(sf)/software-systems",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--introduction-to-blockchain-dlt-for-executives-(sf)/software-systems"]
url9 = ["https://www.iss.nus.edu.sg/executive-education/discipline/detail/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--python-for-data-ops-and-things-(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--client-side-foundation-(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--server-side-foundation-(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--persistence-and-analytics-fundamentals-(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--security-notification-and-messaging-fundamentals-(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--containers-for-deploying-and-scaling-apps-(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--restful-api-design-(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--supervised-and-unsupervised-modeling-with-machine-learning-(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--data-and-feature-engineering-for-machine-learning--(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--sequence-modeling-with-deep-learning-(sf)/stackup---startup-tech-talent-development",
"https://www.iss.nus.edu.sg/executive-education/course/detail/nicf--feature-extraction-and-supervised-modeling-with-deep-learning-(sf)/stackup---startup-tech-talent-development"]

 
def main():
  
  # for overview only
# =============================================================================
#   for a in url:
#     print(a)
#     f= open(a[a.rfind("/")+1:]+".txt","a+") # this is for 1 level
#     #f= open(a[a.rfind("/")+1:]+a[:a.rfind("/")][a[:a.rfind("/")].rfind("/")+1:]+".txt","a+") # this is for 2 levels
#     text = justText(a)
#     #print(text)
#     f.write(text)
#     f.close()
# =============================================================================

  #artificial-intelligence
  for a in url1:
    print(a)
    f= open(a[a.rfind("/")+1:]+".txt","a+")
    text = justText(a)
    f.write(text)
    f.close() 

  for a in url2:
    print(a)
    f= open(a[a.rfind("/")+1:]+".txt","a+")
    text = justText(a)
    f.write(text)
    f.close()   

  for a in url3:
    print(a)
    f= open(a[a.rfind("/")+1:]+".txt","a+")
    text = justText(a)
    f.write(text)
    f.close()   
    
  for a in url4:
    print(a)
    f= open(a[a.rfind("/")+1:]+".txt","a+")
    text = justText(a)
    f.write(text)
    f.close()   

  for a in url5:
    print(a)
    f= open(a[a.rfind("/")+1:]+".txt","a+")
    text = justText(a)
    f.write(text)
    f.close()  
    
  for a in url6:
    print(a)
    f= open(a[a.rfind("/")+1:]+".txt","a+")
    text = justText(a)
    f.write(text)
    f.close() 

  for a in url7:
    print(a)
    f= open(a[a.rfind("/")+1:]+".txt","a+")
    text = justText(a)
    f.write(text)
    f.close() 

  for a in url8:
    print(a)
    f= open(a[a.rfind("/")+1:]+".txt","a+")
    text = justText(a)
    f.write(text)
    f.close() 

  for a in url9:
    print(a)
    f= open(a[a.rfind("/")+1:]+".txt","a+")
    text = justText(a)
    f.write(text)
    f.close() 

  
def justText(url):
  text = getHTML(url)
  text = justContent(text)
  text = stripParams(text)
  # just for course overview
  #text = stripTable(text) #not every page must remove table
  #text = listNuker(text) #not every page must remove list
  #text = overviewOnly(text)
  
# =============================================================================
#   f= open("a.txt","a+")
#   f.write(text)
#   f.close() 
# =============================================================================
  
  courseTitle = getCourseTitleD(text)
  raw = ""
  isDetails = True
  try:
    #raw += "\"Can you give me an overview of "+courseTitle+"?\","
    raw += "\"Can you give me an overview of "+courseTitle+"?\","+"\"" + html2text.html2text(getCourseOverviewD(text)).replace('\n\n', '\r\n') + "\"\r\n"
  except:
    print("overview error")
    # means its not the detailspage, switch to another mode
    isDetails = False
    
  if isDetails:
      try:
        #raw += "\"What is the "+courseTitle+" course key takeaway?\","
        raw += "\"What is the "+courseTitle+" course key takeaway?\","+"\"" + html2text.html2text(getCourseKeyTakeawayD(text)).replace('\n\n', '\r\n') + "\"\r\n"
      except:
        print("key takeaway error")
        
      try:
        #raw += "\"Who should attend "+courseTitle+" course ?\","
        raw += "\"Who should attend "+courseTitle+" course ?\","+"\"" + html2text.html2text(getCourseWhoShouldAttendD(text)).replace('\n\n', '\r\n') + "\"\r\n"
      except:
        print("who should attend error")
    
      try:
        #raw += "\"What are the "+courseTitle+" course pre-requsites?\","
        raw += "\"What are the "+courseTitle+" course pre-requsites?\","+"\"" + html2text.html2text(getCoursePreRequisitesD(text)).replace('\n\n', '\r\n') + "\"\r\n"
      except:
        print("prerequsite error") 
      
      try:
        #raw += "\"What will be covered in this "+courseTitle+" course?\","
        raw += "\"What will be covered in this "+courseTitle+" course?\","+"\"" + html2text.html2text(getCourseWhatWillBeCoveredD(text)).replace('\n\n', '\r\n') + "\"\r\n"
      except:
        print("covered error")
      
      try:
        #raw += "\"What are the "+courseTitle+" course fees?\","
        raw += "\"What are the "+courseTitle+" course fees?\","+"\"" + html2text.html2text(getCourseFeesAndFundingD(text)).replace('\n\n', '\r\n') + "\"\r\n"
      except:
        print("fee error")
      
      try:
        #raw += "\"What are the certs obtained from "+courseTitle+" course?\","
        raw += "\"What are the certs obtained from "+courseTitle+" course?\","+"\"" + html2text.html2text(getCourseCertificationD(text)).replace('\n\n', '\r\n') + "\"\r\n"
      except:
        print("cert error")
  else:
      try:
        raw += "\"What is "+courseTitle+" discipline about?\","+"\"" + html2text.html2text(getCourseDHome(text)).replace('\n\n', '\r\n') + "\"\r\n"
      except:
        print("discipline home error")
  #raw = html2text.html2text(text)
  #raw = raw.replace('\n\n', '\r\n')
  #raw = "\r\n\r\n" + raw.replace('#', '')    
  

                                 
                                 
  #text = noTagBlock(text, "script")
  #print(text)
  #text = noTagBlock(text, "form")
  #print(text)
  #text = stripParams(text)
  #print(text)
  #text = listNuker(text)
  #print(text)
  #text = noTag(text, "div")
  #print(text)
  #text = noTag(text, "span")
  #print(text)
  #text = noTag(text, "img")
  #print(text)
  #text = noTag(text, "a")
  #print(text)
  #text = singleizer(text)
  return raw
 
def getHTML(url):
  try:
    response = requests.get(url)
  except:
    return ''
  return response.text

def justContent(text):
  pattern = r"<!--start content-->(?P<capture>.*)<!--end content-->"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  return bodymat.group('capture')

def getCourseTitleD(text):
  pattern = r"<h1>(?P<capture>.*)</h1>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  return bodymat.group('capture')

def getCourseOverviewD(text):
  pattern = r"<h2>Overview</h2>(?P<capture>.*)<!-- classes -->"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  #<!-- menu (links) -->
  if bodymat is None:
      pattern = r"<!-- overview -->(?P<capture>.*)<!-- menu \(links\) -->"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
      ret = bodymat.group('capture')
      ret = stripTable(ret)
  else: 
      ret = bodymat.group('capture')
      ret = stripTable(ret)
  return ret

def getCourseKeyTakeawayD(text):
  pattern = r"<h2>Key Takeaways </h2>(?P<capture>.*)<h2>Who Should Attend</h2>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  #<h2>Key Takeaways</h2>
  #<h2>Who Should Attend </h2>
  if bodymat is None:
      pattern = r"<h2>Key Takeaways</h2>(?P<capture>.*)<h2>Who Should Attend</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Key Takeaways </h2>(?P<capture>.*)<h2>Who Should Attend </h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Key Takeaways</h2>(?P<capture>.*)<h2>Who Should Attend </h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  return bodymat.group('capture')

def getCourseWhoShouldAttendD(text):
  pattern = r"<h2>Who Should Attend</h2>(?P<capture>.*)<p><strong>Pre-requisites</strong></p>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  #<p><strong>Prerequisites</strong></p>
  #<strong> Pre-requisites </strong>
  #<strong> Pre-requisites <br>
  #<strong>Prerequisites</strong>
  #<strong> Prerequisites </strong>
  #<strong>Pre-requisites<br>
  #<strong>Pre-requisites</strong>
  #<h4>Pre-requisites</h4>
  if bodymat is None:
      pattern = r"<h2>Who Should Attend</h2>(?P<capture>.*)<p><strong>Prerequisites</strong></p>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend</h2>(?P<capture>.*)<strong> Pre-requisites </strong>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend</h2>(?P<capture>.*)<strong> Pre-requisites <br>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend</h2>(?P<capture>.*)<strong>Prerequisites</strong>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend</h2>(?P<capture>.*)<strong> Prerequisites </strong>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend</h2>(?P<capture>.*)<strong>Pre-requisites<br>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend</h2>(?P<capture>.*)<strong>Pre-requisites</strong>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend</h2>(?P<capture>.*)<h4>Pre-requisites</h4>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  
  if bodymat is None:
      pattern = r"<h2>Who Should Attend </h2>(?P<capture>.*)<p><strong>Prerequisites</strong></p>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend </h2>(?P<capture>.*)<strong> Pre-requisites </strong>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend </h2>(?P<capture>.*)<strong> Pre-requisites <br>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend </h2>(?P<capture>.*)<strong>Prerequisites</strong>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend </h2>(?P<capture>.*)<strong> Prerequisites </strong>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend </h2>(?P<capture>.*)<strong>Pre-requisites<br>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend </h2>(?P<capture>.*)<strong>Pre-requisites</strong>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Who Should Attend </h2>(?P<capture>.*)<h4>Pre-requisites</h4>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  return bodymat.group('capture')

def getCoursePreRequisitesD(text):
  pattern = r"<p><strong>Pre-requisites</strong></p>(?P<capture>.*)<h2>What Will Be Covered</h2>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<p><strong>Prerequisites</strong></p>(?P<capture>.*)<h2>What Will Be Covered</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<strong> Pre-requisites </strong>(?P<capture>.*)<h2>What Will Be Covered</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<strong> Pre-requisites <br>(?P<capture>.*)<h2>What Will Be Covered</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<strong>Prerequisites</strong>(?P<capture>.*)<h2>What Will Be Covered</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<strong> Prerequisites </strong>(?P<capture>.*)<h2>What Will Be Covered</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<strong>Pre-requisites<br>(?P<capture>.*)<h2>What Will Be Covered</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<strong>Pre-requisites</strong>(?P<capture>.*)<h2>What Will Be Covered</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h4>Pre-requisites</h4>(?P<capture>.*)<h2>What Will Be Covered</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  return bodymat.group('capture')

def getCourseWhatWillBeCoveredD(text):
  pattern = r"<h2>What Will Be Covered</h2>(?P<capture>.*)<h2>Fees and Funding </h2>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  #<h2>Fees & Funding</h2>
  #<h2>Fees and Funding </h2>
  #<h2>Fees & Funding </h2>
  if bodymat is None:
      pattern = r"<h2>What Will Be Covered</h2>(?P<capture>.*)<h2>Fees & Funding</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>What Will Be Covered</h2>(?P<capture>.*)<h2>Fees and Funding </h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>What Will Be Covered</h2>(?P<capture>.*)<h2>Fees & Funding </h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  return bodymat.group('capture')

def getCourseFeesAndFundingD(text):
  pattern = r"<h2>Fees and Funding </h2>(?P<capture>.*)<h2>Certification </h2>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  #<h2>Certificate</h2>
  #<h2>Certificate </h2>
  #<h2>Exams & Certificate</h2>
  if bodymat is None:
      pattern = r"<h2>Fees and Funding </h2>(?P<capture>.*)<h2>Certificate</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Fees and Funding </h2>(?P<capture>.*)<h2>Certificate </h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Fees and Funding </h2>(?P<capture>.*)<h2>Exams & Certificate</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
      
  if bodymat is None:
      pattern = r"<h2>Fees & Funding</h2>(?P<capture>.*)<h2>Certification </h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Fees & Funding</h2>(?P<capture>.*)<h2>Certificate</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Fees & Funding</h2>(?P<capture>.*)<h2>Certificate </h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Fees & Funding</h2>(?P<capture>.*)<h2>Exams & Certificate</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  
  if bodymat is None:
      pattern = r"<h2>Fees & Funding </h2>(?P<capture>.*)<h2>Certification </h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Fees & Funding </h2>(?P<capture>.*)<h2>Certificate</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Fees & Funding </h2>(?P<capture>.*)<h2>Certificate </h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Fees & Funding </h2>(?P<capture>.*)<h2>Exams & Certificate</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  return bodymat.group('capture')

def getCourseCertificationD(text):
  pattern = r"<h2>Certification </h2>(?P<capture>.*)<h2>Preparing for Your Course</h2>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Certificate</h2>(?P<capture>.*)<h2>Preparing for Your Course</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Certificate </h2>(?P<capture>.*)<h2>Preparing for Your Course</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  if bodymat is None:
      pattern = r"<h2>Exams & Certificate</h2>(?P<capture>.*)<h2>Preparing for Your Course</h2>"
      pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
      bodymat = pat.search(text)
  return bodymat.group('capture')

def getCourseDHome(text):
  pattern = r"<li><a>Print</a></li>(?P<capture>.*)<a>More</a>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  return bodymat.group('capture')

def justBody(text):
  pattern = r"<\s*body\s*.*?>(?P<capture>.*)<\s*/body\s*>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  bodymat = pat.search(text)
  return bodymat.group('capture')
 
def stripParams(text):
  pattern = r"(<\s*[a-zA-Z0-9]+).*?(?:>)"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  nopram = pat.sub(r'\1>', text)
  return nopram

def stripTable(text):
  pattern = r"<\s*(table)\s*.*?>.*?<\s*/(table)\s*>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  nopram = pat.sub('', text)
  return nopram

def overviewOnly(text):
  pattern = r"<!-- menu (dropdown) -->.*?<!-- overview -->"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  nopram = pat.sub('', text)
  nopram = nopram[:nopram.find("<!-- classes -->")]  
  pattern = r"<\s*(button)\s*.*?>.*?<\s*/(button)\s*>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  nopram = pat.sub('', nopram)
  return nopram

def listNuker(text):
  pattern = r"<\s*(ol|ul)\s*.*?>.*?<\s*/(ol|ul)\s*>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  listless = pat.sub('', text)
  pattern = r"<\s*li\s*.*?>.*?<\s*/li\s*>"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  listless = pat.sub('', listless)
  pattern = r"(<\s*(li|ol|ul)\s*.*?>)|(<\s*/(li|ol|ul)\s*>)"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  listless = pat.sub('', listless)
  return listless
 
def noTag(text, tag):
  pattern = r"(<\s*%s\s*.*?>)|(<\s*/%s\s*>)" % (tag, tag)
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  tagless = pat.sub('', text)
  return tagless
 
def noTagBlock(text, tag):
  pattern = r"<\s*%s\s*.*?>.*<\s*/%s\s*>" % (tag, tag)
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  byeblock = pat.sub('', text)
  return byeblock
 
def singleizer(text):
  pattern = r"\t|\r"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  singled = pat.sub('', text)
  pattern = r"(\n{2,})"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  singled = pat.sub(r'\n', singled)
  pattern = r"^\n|\n$"
  pat = re.compile(pattern, re.IGNORECASE | re.DOTALL)
  singled = pat.sub('', singled)
  return singled
 
if __name__ == '__main__':
  main()

