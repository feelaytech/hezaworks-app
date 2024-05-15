/* eslint-disable */
// @ts-nocheck

import { useState, useEffect } from "react";
import {
  PageError,
  PageErrorButton,
  PageLoading,
  PageLoadingWrapper,
} from "../styles/PageLoading.styles";
import useAxiosPrivate from "../hooks/UseAxiosPrivate";
import {
  TLButton,
  TLCard,
  TLName,
  TLTitle,
  TPButton,
  TalentListAttribute,
  TalentListContainer,
  TalentListLink,
  TalentListTitle,
} from "../styles/TalentList.styles";
import { Title } from "../styles/Jobpost.styles";
import { TPatag } from "../styles/ViewTalentProfile.styles";
import { BASE_URL } from "../api/axios";
import { PgButton, PgContainer, PgSpan } from "../styles/Pagination.styles";
import { useNavigate } from "react-router-dom";

function TalentsList() {
  const axiosPrivate = useAxiosPrivate();
  const [talents, setTalents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "HezaWorks | Talents List";
    axiosPrivate
      .get(`/auth/users/talentlist?page=${currentPage}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      })
      .then((response) => {
        setTalents(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!err?.response) {
          setError("No response from server");
        } else if (err.response?.status === 401) {
          setError(
            "Your account is inactive. Please contact the administrator."
          );
        }
      });
  }, [currentPage]);

  let talentsCount = 0;
  talents.map((talent) => {
    talentsCount = talent.count;
  });
  const pageCount = Math.ceil(talentsCount / 4);

  if (error) {
    return (
      <PageLoadingWrapper>
        <PageError>{error}</PageError>
        <PageErrorButton onClick={() => window.location.reload()}>
          Try again
        </PageErrorButton>
      </PageLoadingWrapper>
    );
  } else if (isLoading) {
    return (
      <PageLoadingWrapper>
        <PageLoading>Loading...</PageLoading>
      </PageLoadingWrapper>
    );
  } else {
    return (
      <>
        <Title>Talents List</Title>
        {/* {talents &&
          talents.map((talent) => (
            <TalentListContainer key={talent.id}>
              <TalentListAttribute>
                <TalentListTitle>Talent Name</TalentListTitle>
                {talent.name}
              </TalentListAttribute>
              <TalentListAttribute>
                <h3>Resume</h3>
                <TPatag
                  href={`${BASE_URL}main/cv/${talent.resume}`}
                  target="_blank"
                >
                  {talent.resume}
                </TPatag>
              </TalentListAttribute>
              {/* <TalentListTitle>Resume</TalentListTitle>
          <TalentListLink to="#">{talent.resume}</TalentListLink>
          </TalentListAttribute> *
              <TalentListAttribute>
                <TalentListTitle>Contact</TalentListTitle>
                {talent.phone}
              </TalentListAttribute>
              <TalentListAttribute>
                <TalentListTitle>Email</TalentListTitle>
                {talent.email}
              </TalentListAttribute>
              <TalentListAttribute>
                <TalentListTitle>Place of Residence</TalentListTitle>
                {talent.city}
              </TalentListAttribute>
              <TalentListAttribute>
                <TalentListTitle>Level of Education</TalentListTitle>
                {talent.education_level}
              </TalentListAttribute>
              <TalentListAttribute>
                <TalentListTitle>Field of Study</TalentListTitle>
                {talent.field}
              </TalentListAttribute>
              <TalentListAttribute>
                <TalentListTitle>Current or Former Employer</TalentListTitle>
                {talent.employer}
              </TalentListAttribute>
              <TalentListAttribute>
                <TalentListTitle>Current or Former Job Title</TalentListTitle>
                {talent.title}
              </TalentListAttribute>
              <TalentListAttribute>
                <TalentListTitle>
                  Roles Performed at Former or Current Job
                </TalentListTitle>
                {talent.responsibilities}
              </TalentListAttribute>
              <TPButton>
                <TalentListLink to={`/user/viewprofiles/${talent.id}`}>
                  View More
                </TalentListLink>
              </TPButton>
            </TalentListContainer>
          ))} */}
        {talents && talents.map((talent) => (
      <TLCard key={talent.id}>
      <TLName>{talent.name}</TLName>
      <TLTitle>{talent.title}</TLTitle>
          <TLButton onClick={() => navigate(`/user/viewprofiles/${talent.id}`)}>
          View this talent
          </TLButton>
        </TLCard>
      ))}
  <PgContainer>
      <PgButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</PgButton>
      <PgSpan> Page {currentPage} </PgSpan>
      <PgButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount}>Next</PgButton>
  </PgContainer>
  </>
    );
  }
}

export default TalentsList;
