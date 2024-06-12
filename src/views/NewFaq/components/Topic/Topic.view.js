import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Style.module.css";
import { ButtonBase, IconButton } from "@mui/material";
import { AddCircleOutline, Edit } from "@mui/icons-material";
import csx from "classnames";
import SidePanelComponent from "../../../../components/SidePanel/SidePanel.component";
import { bindActionCreators } from "redux";
import {
  actionChangeStatusFaq,
  actionCreateFaq,
  actionDeleteFaq,
  actionFetchFaq,
  actionFilterFaq,
  actionResetFilterFaq,
  actionSetPageFaq,
  actionUpdateFaq,
  actionDragFaq,
} from "../../../../actions/Faq.action";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";
import TopicViewForm from "../Topic/TopicForm/TopicView.js";

const TopicView = (props) => {
  const [active, setActive] = useState(0);
  const [sidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);
  const [topics, setTopics] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const prevDataRef = useRef();
  useEffect(() => {
    prevDataRef.current = props.data;
  });
  const prevData = prevDataRef.current;
  const draggedItem = useRef();
  const draggedOverItem = useRef();

  useEffect(() => {
    props.actionFetchData();
    if (props.data.length > 0) {
      props.handleCategoryChange(props.data[0]);
    }
  }, [sidePanel]);

  useEffect(() => {
    if (prevData && prevData.length !== props.data.length) {
      props.handleCategoryChange(props.data[0]);
    }
  }, [props.data]);

  const handleAddTopic = useCallback(
    (type) => {
      props.handleSideToggle(type);
    },
    [props.handleSideToggle]
  );

  const handleSideToggle = useCallback(() => {
    setSidePanel(!sidePanel);
    setEditData(null);
  }, [sidePanel]);

  const handleDataSave = useCallback(
    (data, type) => {
      if (type === "CREATE") {
        props.actionCreateFaq(data);
      } else {
        props.actionUpdateFaq(data);
      }
      setSidePanel(false);
      setEditData(null);
    },
    [sidePanel]
  );

  const handleDelete = useCallback(
    (id) => {
      props.actionDelete(id);
      setSidePanel(false);
      setEditData(null);
    },
    [sidePanel]
  );

  const handleChangeType = useCallback(
    (index, val) => {
      setActive(index);
      props.handleCategoryChange(val);
    },
    [props.handleCategoryChange]
  );

  const handleEdit = useCallback(
    (data) => {
      setSidePanel(!sidePanel);
      setEditData(data);
      props.handleCategoryChange(data);
    },
    [sidePanel]
  );

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      setTopics(arrayMove(topics, oldIndex, newIndex));
    },
    [topics]
  );
  const handleDrag = useCallback((dragId, dragOverId) => {
    props.actionDragFaq(dragId, dragOverId);
  }, []);

  const renderList = () => {
    const { data, selectedCategory } = props;
    if (data.length > 0) {
      return data.map((val, index) => (
        <ul key={`list_val_${val.id}`} className={styles.list}>
          <li className={styles.item}>
            <ButtonBase
              className={
                selectedCategory && val.id === selectedCategory.id
                  ? csx(styles.selected, styles.active)
                  : csx(styles.notSelected)
              }
              onClick={() => handleChangeType(index, val)}
            >
              <span
                id={val.id}
                draggable={true}
                onDragStart={(e) => {
                  draggedItem.current = e.target.id;
                }}
                onDragOver={(e) => {
                  // e.stopPropagation();
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
                {val.title}
              </span>
            </ButtonBase>
            <IconButton onClick={() => handleEdit(val)}>
              <Edit color={"primary"} fontSize={"small"} />
            </IconButton>
          </li>
          <hr className={styles.line} />
        </ul>
      ));
    }
  };

  

  return (
    <div>
      <div className={styles.plainBg}>
        <div className={styles.upperFlex}>
          <div className={styles.title}>Browse By Topic</div>
          <div>
            <IconButton onClick={handleSideToggle}>
              <AddCircleOutline color={"primary"} />
            </IconButton>
          </div>
        </div>
        <div>{renderList()}</div>
      </div>
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={"Add/Manage FAQ"}
        open={sidePanel}
        side={"right"}
      >
        <TopicViewForm
          dataExist={editData}
          handletoggleSidePannel={handleSideToggle}
        />
      </SidePanelComponent>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.faq.present,
  total_count: state.faq.all.length,
  currentPage: state.faq.currentPage,
  serverPage: state.faq.serverPage,
  sorting_data: state.faq.sorting_data,
  is_fetching: state.faq.is_fetching,
  query: state.faq.query,
  query_data: state.faq.query_data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      actionFetchData: actionFetchFaq,
      actionSetPage: actionSetPageFaq,
      actionResetFilter: actionResetFilterFaq,
      actionSetFilter: actionFilterFaq,
      actionChangeStatus: actionChangeStatusFaq,
      actionCreateFaq: actionCreateFaq,
      actionUpdateFaq: actionUpdateFaq,
      actionDelete: actionDeleteFaq,
      actionDragFaq: actionDragFaq,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TopicView);
