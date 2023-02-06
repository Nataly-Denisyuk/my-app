import React, { useState } from "react";
import styled from "styled-components";
import {
  DateTimeDateInput,
  DateTimeTimeInput,
  Field,
  InputField,
  SelectField,
  Option
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
    assignmentType: "0",    
    options: {
      assignmentTypes: [ 
        { value: "0", text: "--- Не выбран ---" },
        { value: "1", text: "тип 1" },
        { value: "2", text: "тип 2" },
        { value: "3", text: "тип 3" },
      ]
    }
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
                value={filterState.assignmentType}
                onChange={(el) =>
                  setFilterState((prevState) => ({
                    ...prevState,
                    assignmentType: el.target.value,
                  }))
                }
              >
                {
                  filterState.options && filterState.options.assignmentTypes && 
                  filterState.options.assignmentTypes.map(o => 
                    <Option key={o.value} value={o.value}>
                      {o.text}  
                    </Option>
                  )
                }
              </SelectField>
            </FlexDiv>
          </Field>
        </DisplayContainer>
      </div>
    </div>
  );
};

export default SomeBankForm;
