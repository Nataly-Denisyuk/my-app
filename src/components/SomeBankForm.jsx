import React, { useState } from "react";
import styled from "styled-components";
import {
  DateTimeDateInput,
  DateTimeTimeInput,
  Field,
  InputField,
  SelectField,
} from "@admiral-ds/react-ui";

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: horizontal;
  padding: 8px;
  > * {
    margin-bottom: 24px;
  }
  ,
  > *:not(:last-child) {
    margin-right: 12px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  max-width: 300px;
`;

const SomeBankForm = () => {
  const [filterState, setFilterState] = useState(() => ({
    startDate: "12.12.2022",
    startTime: "10:10",
    endDate: "12.12.2023",
    endTime: "10:10",
    assignmentNumber: "123456r",
    contractNumber: "41444001",
    clientCode: "41444000",
    assignmentType1: "тип 1",
    assignmentType2: "тип 2",
    assignmentType3: "тип 3",
  }));

  console.log("state:", filterState);

  return (
    <div>
      {/* Filters */}
      <div>
        <DisplayContainer>
          <Field label="Дата начала периода">
            <FlexDiv>
              <DateTimeDateInput
                value={filterState.startDate}
                onChange={(el) =>
                  setFilterState((prevState) => ({
                    ...prevState,
                    startDate: el.target.value,
                  }))
                }
              />
              <DateTimeTimeInput
                value={filterState.startTime}
                onChange={(el) =>
                  setFilterState((prevState) => ({
                    ...prevState,
                    startTime: el.target.value,
                  }))
                }
              />
            </FlexDiv>
          </Field>
          <Field label="Дата окончания периода">
            <FlexDiv>
              <DateTimeDateInput
                value={filterState.endDate}
                onChange={(el) =>
                  setFilterState((prevState) => ({
                    ...prevState,
                    endDate: el.target.value,
                  }))
                }
              />
              <DateTimeTimeInput
                value={filterState.endTime}
                onChange={(el) =>
                  setFilterState((prevState) => ({
                    ...prevState,
                    endTime: el.target.value,
                  }))
                }
              />
            </FlexDiv>
          </Field>
          <Field label="Номер поручения">
            <FlexDiv>
              <InputField
                value={filterState.assignmentNumber}
                onChange={(el) =>
                  setFilterState((prevState) => ({
                    ...prevState,
                    assignmentNumber: el.target.value,
                  }))
                }
              />
            </FlexDiv>
          </Field>
          <Field label="Номер соглашения">
            <FlexDiv>
              <InputField
                value={filterState.contractNumber}
                onChange={(el) =>
                  setFilterState((prevState) => ({
                    ...prevState,
                    contractNumber: el.target.value,
                  }))
                }
              />
            </FlexDiv>
          </Field>
          <Field label="Код клиента">
            <FlexDiv>
              <InputField
                value={filterState.clientCode}
                onChange={(el) =>
                  setFilterState((prevState) => ({
                    ...prevState,
                    clientCode: el.target.value,
                  }))
                }
              />
            </FlexDiv>
          </Field>
          <Field label="Тип поручения">
            <FlexDiv>
              <SelectField
                value={filterState}
                onChange={(el) =>
                  setFilterState((prevState) => ({
                    ...prevState,
                    assignmentType: el.target.value,
                  }))
                }
              />
            </FlexDiv>
          </Field>
        </DisplayContainer>
      </div>
    </div>
  );
};

export default SomeBankForm;
