import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import LabelStatus from "components/label/LabelStatus";
import ButtonAction from "components/button/ButtonAction";
import Button from "components/button/Button";
import useFetchCards from "hooks/useFetchCards";
import { cardStatus } from "constant/global-constant";

const CardManage = (props) => {
  const { cards } = useFetchCards();
  if (cards.length <= 0) return null;
  const renderStatus = (status) => {
    switch (status) {
      case cardStatus.APPROVED:
        return <LabelStatus type={status}>Approved</LabelStatus>;

      default:
        return <LabelStatus type={status}>Rejected</LabelStatus>;
    }
  };
  return (
    <div className="mt-10">
      <div className="flex justify-end mb-10">
        <Link href="/manage/add-new-card">
          <a className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]">
            Add new card
          </a>
        </Link>
      </div>
      <div className="table overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Filter</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => {
              return (
                <tr key={card.title}>
                  <td>{card.title}</td>
                  <td>{card.filter}</td>
                  <td>{renderStatus(card.status)}</td>
                  <td>
                    {new Date(
                      card.createdAt?.seconds * 1000
                    ).toLocaleDateString("vi-VI")}
                  </td>
                  <td>
                    <div className="flex items-center gap-x-5">
                      <Link href={`/manage/update-card?id=${card.id}`}>
                        <a>
                          <ButtonAction>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                              <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </ButtonAction>
                        </a>
                      </Link>
                      <ButtonAction>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </ButtonAction>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-10 text-center">
        <Button>Load more...</Button>
      </div>
    </div>
  );
};

CardManage.propTypes = {};

export default CardManage;
