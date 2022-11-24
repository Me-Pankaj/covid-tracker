import React, { useState } from "react";
import { Table, Space, Input, Pagination, Tooltip } from "antd";

const TableComponent = ({
  totalStateWiseCount,
  loading,
  totalStateArrayLength,
  loadData,
  stateSearch,
  filteredData,
}) => {
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const handleChange = (_, filters, sorter) => {
    console.log("sorter", sorter);
    console.log("filters", filters);
    const { order, field } = sorter;
    setSortedInfo({ columnKey: field, order });
  };
  const indexOfLastPage = page + postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentStateCovidCount = totalStateWiseCount.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  const onShowSizeChange = (current, pageSize) => {
    setPostPerPage(pageSize);
  };

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return <a className="text-primary">Previous</a>;
    }
    if (type === "next") {
      return <a className="text-info">Next</a>;
    }

    return originalElement;
  };

  const columns = [
    {
      title: "State/UT",
      dataIndex: "state",
      sorter: (a, b) => a.state.length - b.state.length,
      sortOrder: sortedInfo.columnKey === "state" && sortedInfo.order,
      width: 120,
    },
    {
      title: "Confirmed",
      dataIndex: "confirmed",
      sorter: (a, b) => a.confirmed.length - b.confirmed.length,
      sortOrder: sortedInfo.columnKey === "confirmed" && sortedInfo.order,
      width: 150,
    },
    {
      title: "Active",
      dataIndex: "active",
      sorter: (a, b) => a.active.length - b.active.length,
      sortOrder: sortedInfo.columnKey === "active" && sortedInfo.order,
      width: 150,
    },
    {
      title: "Recovered",
      dataIndex: "recovered",
      sorter: (a, b) => a.recovered.length - b.recovered.length,
      sortOrder: sortedInfo.columnKey === "recovered" && sortedInfo.order,
      width: 150,
    },
    {
      title: "Deaths",
      dataIndex: "deaths",
      sorter: (a, b) => a.deaths.length - b.deaths.length,
      sortOrder: sortedInfo.columnKey === "deaths" && sortedInfo.order,
      width: 150,
    },
    {
      title: "Daily Confirmed",
      dataIndex: "deltaconfirmed",
      sorter: (a, b) => a.deltaconfirmed.length - b.deltaconfirmed.length,
      sortOrder: sortedInfo.columnKey === "deltaconfirmed" && sortedInfo.order,
      width: 150,
    },
    {
      title: "Daily Recovered",
      dataIndex: "deltarecovered",
      sorter: (a, b) => a.deltarecovered.length - b.deltarecovered.length,
      sortOrder: sortedInfo.columnKey === "deltarecovered" && sortedInfo.order,
      width: 150,
    },
    {
      title: "Daily Deaths",
      dataIndex: "deltadeaths",
      sorter: (a, b) => a.deltadeaths.length - b.deltadeaths.length,
      sortOrder: sortedInfo.columnKey === "deltadeaths" && sortedInfo.order,
      width: 120,
    },
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      loadData();
    }
  };

  const clearAll = () => {
    setSortedInfo({});
    setSearchText("");
    loadData();
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Space style={{ marginBottom: 16, marginTop: 10 }}>
        <Input
          placeholder="Search Your State"
          onChange={handleSearch}
          type="text"
          style={{height : "35px"}}
          allowClear
          value={searchText}
        />
        <Tooltip title="Search">
          <button
            onClick={() => stateSearch(searchText)}
            className="btn btn-raised btn-success"
          >
            Search
          </button>
        </Tooltip>
        <Tooltip title="Clear">
          <button onClick={clearAll} className="btn btn-raised btn-info">
            Clear
          </button>
        </Tooltip>
        <Tooltip title="Refresh">
          <button className="btn btn-raised btn-warning" onClick={refresh}>
            Refresh
          </button>
        </Tooltip>
      </Space>
      <Table
        columns={columns}
        dataSource={
          filteredData && filteredData.length
            ? filteredData
            : currentStateCovidCount.length !== 0
            ? currentStateCovidCount
            : totalStateWiseCount
        }
        onChange={handleChange}
        bordered
        pagination={false}
        loading={loading}
      />
      <Space style={{ marginBottom: 16, marginTop: 10 }}>
        <Pagination
          onChange={(value) => setPage(value)}
          pageSize={postPerPage}
          total={totalStateArrayLength}
          current={page}
          showSizeChanger
          showQuickJumper
          onShowSizeChange={onShowSizeChange}
          itemRender={itemRender}
        />
      </Space>
    </>
  );
};

export default TableComponent;
