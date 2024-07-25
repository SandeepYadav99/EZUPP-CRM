import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
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
import { serviceUpdateFaqPriority } from "../../../../services/Faq.service";
import debounce from "lodash.debounce";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox.js";
import { useTheme } from "@mui/styles";

const TopicView = (props) => {
  const [active, setActive] = useState(0);
  const [sidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);
  const [topics, setTopics] = useState([]);
  const theme = useTheme();

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

  const handleSideToggle = useCallback(() => {
    setSidePanel(!sidePanel);
    setEditData(null);
  }, [sidePanel]);

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

  const updatePrioirty = useCallback((all) => {
    const req = serviceUpdateFaqPriority({ data: [...all] });
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

  const renderList = () => {
    const { data, selectedCategory } = props;
    if (data.length > 0) {
      return data.map((val, index) => (
        <ul key={`list_val_${val.id}`} className={styles.list}>
          <li className={styles.item}>
            <ButtonBase
              sx={{
                backgroundColor:
                  selectedCategory &&
                  val.id === selectedCategory.id &&
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : "",
      
              }}
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
          <div className={styles.line} />
        </ul>
      ));
    }
  };

  return (
    <div>
      <ShadowBox>
        <div className={styles.upperFlex}>
          <div className={styles.title}>Browse By Topic</div>
          <div>
            <IconButton onClick={handleSideToggle}>
              <AddCircleOutline color={"primary"} />
            </IconButton>
          </div>
        </div>
        <div>{renderList()}</div>
      </ShadowBox>
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={editData?.id ? "Edit FAQ" : "Add FAQ"}
        open={sidePanel}
        side={"right"}
      >
        <TopicViewForm
          isOpen={sidePanel}
          dataExist={editData}
          handletoggleSidePannel={handleSideToggle}
          listlength={props?.data?.length}
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
