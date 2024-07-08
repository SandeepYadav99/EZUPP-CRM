import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import Accordion from "../../../../components/Accordion/Accordion.component";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import QuestionsForm from "./QuestionsForm.view";
import styles from "./Style.module.css";
import {
  actionChangeStatusFaqQuestion,
  actionCreateFaqQuestion,
  actionDeleteFaqQuestion,
  actionFetchFaqQuestion,
  actionFilterFaqQuestion,
  actionResetFilterFaqQuestion,
  actionSetPageFaqQuestion,
  actionUpdateFaqQuestion,
  actionDragFaqQuestion
} from "../../../../actions/Faq_question.action";
import debounce from "lodash.debounce";
import { serviceUpdateFaqPriority } from "../../../../services/Faq.service";
import { serviceUpdateFaqQuestionPriority } from "../../../../services/FaqQuestion.service";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";


const QuestionView = (props) => {
  const [sidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);
  const draggedItem = useRef();
  const draggedOverItem = useRef();
  const {
    category,
    data,
    actionFetchData,
    actionCreateFaq,
    actionUpdateFaq,
    actionDelete,
  } = props;

  useEffect(() => {
    if (category) {
      actionFetchData(category.id);
    }
  }, [category, actionFetchData]);

  const handleEdit = (index) => {
    const selectedQues = data[index];
    setSidePanel(!sidePanel);
    setEditData(selectedQues);
  };

  const handleDelete = (id) => {
    actionDelete(id);
    setSidePanel(!sidePanel);
    setEditData(null);
  };

  const handleSideToggle = () => {
    setSidePanel(!sidePanel);
    setEditData(null);
    if (category) {
      actionFetchData(category.id);
    }
  };

  const handleDataSave = (data, type) => {
    if (type === "CREATE") {
      actionCreateFaq(data);
    } else {
      actionUpdateFaq(data);
    }
    setSidePanel(!sidePanel);
    setEditData(null);
  };

  const updatePrioirty = useCallback((all) => {
    const req = serviceUpdateFaqQuestionPriority({ data: [...all] });
    req.then((res) => {
      if (!res?.error) {
        console.log(">>>>res", res);
      }
    });
  }, []);

  const priorityDebounce = useMemo(() => {
    return debounce((e) => {
      updatePrioirty(e);
    }, 1000);
  }, []);

  const handleDrag = useCallback(
    (dragId, dragOverId) => {
      const all = props?.data ? props?.data : [];
      const dragIndex = all?.findIndex((item) => item?.id === dragId);
      const draggedOverIndex = all?.findIndex(
        (item) => item?.id === dragOverId
      );
      if (dragIndex >= 0 && draggedOverIndex >= 0) {
        const temp = all[dragIndex];
        all.splice(dragIndex, 1);
        all.splice(draggedOverIndex, 0, temp);
        const priority = all?.map((item, index) => {
          return {
            ...item,
            priority: index,
          };
        });
        priorityDebounce(priority);
      }

      props.actionDragFaq(dragId, dragOverId);
    },
    [props]
  );
  
  const renderQuestions = () => {
    if (data?.length > 0) {
      return data.map((val, index) => (
        <div
          key={val.id}
          id={val.id}
          draggable={true}
          onDragStart={(e) => {
            draggedItem.current = e.target.id;
          }}
          onDragOver={(e) => {
            e.preventDefault();
            draggedOverItem.current = e.currentTarget.id;
            if (draggedItem.current && draggedOverItem.current) {
              handleDrag &&
                handleDrag(draggedItem.current, draggedOverItem.current);
            }
          }}
          onDragEnd={(e) => {
            if (draggedItem.current && draggedOverItem.current) {
              handleDrag &&
                handleDrag(draggedItem.current, draggedOverItem.current);
            }
            draggedOverItem.current = null;
            draggedItem.current = null;
          }}
        >
          <Accordion
            quesIndex={index}
            onEditClick={() => handleEdit(index)}
            title={val.question}
            initial="hide"
          >
            <div
              className={"innerHtml"}
              dangerouslySetInnerHTML={{ __html: val.description }}
            ></div>
          </Accordion>
        </div>
      ));
    }
    return null;
  };

  const renderCreateForm = () => {
    if (sidePanel) {
      return (
        <QuestionsForm
         isOpen={sidePanel}
          category={category}
          handleDataSave={handleDataSave}
          data={editData}
          handleDelete={handleDelete}
          handleToggleSidePannel={handleSideToggle}
          listLength={data?.length}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <ShadowBox width={'100%'} className={styles.plainBg}>
        <div className={styles.upperFlex}>
          <div className={styles.title}>{category ? category.title : ""}</div>
          <div>
            <IconButton disabled={!category} onClick={handleSideToggle}>
              <AddCircleOutline color={"primary"} />
            </IconButton>
          </div>
        </div>
        <div>{renderQuestions()}</div>
      </ShadowBox>
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={"Add/Manage FAQ Topic"}
        open={sidePanel}
        side={"right"}
      >
        {renderCreateForm()}
      </SidePanelComponent>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.faq_question.present,
  total_count: state.faq_question.all.length,
  currentPage: state.faq_question.currentPage,
  serverPage: state.faq_question.serverPage,
  sorting_data: state.faq_question.sorting_data,
  is_fetching: state.faq_question.is_fetching,
  query: state.faq_question.query,
  query_data: state.faq_question.query_data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionFetchData: actionFetchFaqQuestion,
      actionSetPage: actionSetPageFaqQuestion,
      actionResetFilter: actionResetFilterFaqQuestion,
      actionSetFilter: actionFilterFaqQuestion,
      actionChangeStatus: actionChangeStatusFaqQuestion,
      actionCreateFaq: actionCreateFaqQuestion,
      actionUpdateFaq: actionUpdateFaqQuestion,
      actionDelete: actionDeleteFaqQuestion,
      actionDragFaq: actionDragFaqQuestion,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
