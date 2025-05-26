import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React from "react";
const RecommendTable = (props: { universities: any }) => {
  const lastYear = new Date().getFullYear() - 1;
  interface DataType {
    key: React.Key;
    schoolId: string;
    required: string;
    lowestScore: number;
    lastYearRank: number;
    chineseAndMathHighest: number;
    chineseAndMath: number;
    english: number;
    firstSubject: number;
    secondSubject: number;
    id: number;
    previousYearRank: number;
    previousYearLowestScore: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "院校代号",
      dataIndex: "schoolId",
      key: "schoolId",
      width: 50,
      fixed: "left",
    },
    {
      title: `${lastYear}年投档最低分`,
      dataIndex: "lowestScore",
      key: "lowestScore",
      width: 50,
      fixed: "left",
    },
    {
      title: `${lastYear}年投档最低名次`,
      dataIndex: "lastYearRank",
      key: "lastYearRank",
      width: 50,
      fixed: "left",
    },
    {
      title: `${lastYear - 1}年投档最低分`,
      dataIndex: "previousYearLowestScore",
      key: "previousYearLowestScore",
      width: 50,
      fixed: "left",
    },
    {
      title: `${lastYear - 1}年投档最低名次`,
      dataIndex: "previousYearRank",
      key: "previousYearRank",
      width: 50,
      fixed: "left",
    },
    {
      title: "院校、专业组（再选科目要求）",
      dataIndex: "required",
      key: "required",
      width: 100,
      fixed: "left",
    },
    {
      title: `${lastYear}投档最低分同分考生排序项`,
      children: [
        {
          title: "语数成绩",
          dataIndex: "chineseAndMath",
          key: "chineseAndMath",
          width: 50,
        },
        {
          title: "语数最高成绩",
          dataIndex: "chineseAndMathHighest",
          key: "chineseAndMathHighest",
          width: 50,
        },
        {
          title: "外语成绩",
          dataIndex: "english",
          key: "english",
          width: 50,
        },
        {
          title: "首选科目成绩",
          dataIndex: "firstSubject",
          key: "firstSubject",
          width: 50,
        },
        {
          title: "再选科目最高成绩",
          dataIndex: "secondSubject",
          key: "secondSubject",
          width: 50,
        },
        {
          title: "志愿号",
          dataIndex: "id",
          key: "id",
          width: 50,
        },
      ],
    },
  ];
  console.log(props.universities);
  /**
   *
   *     {
   *         "2021": {
   *             "lowestScore": 557,
   *             "rank": 12045
   *         },
   *         "2022": {
   *             "lowestScore": "550",
   *             "sortRule": {
   *                 "chineseAndMath": "197",
   *                 "chineseAndMathHighest": "107",
   *                 "english": "125",
   *                 "firstSubject": "60",
   *                 "secondSubject": "87",
   *                 "id": "2"
   *             },
   *             "rank": 11250
   *         },
   *         "schoolId": "1111",
   *         "required": "南京邮电大学02专业组(不限)"
   *     },
   */
  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    const lastYearData = props.universities[i]?.[lastYear];
    const previousYearData = props.universities[i]?.[lastYear - 1];
    data.push({
      key: i,
      schoolId: props.universities[i]?.schoolId,
      lowestScore: lastYearData.lowestScore,
      lastYearRank: lastYearData.rank,
      required: props.universities[i]?.required,
      chineseAndMathHighest: lastYearData.sortRule.chineseAndMathHighest,
      chineseAndMath: lastYearData.sortRule?.chineseAndMath,
      english: lastYearData.sortRule?.english,
      firstSubject: lastYearData.sortRule?.firstSubject,
      secondSubject: lastYearData.sortRule?.secondSubject,
      id: lastYearData.sortRule?.id,
      previousYearRank: previousYearData ? previousYearData.rank : 0,
      previousYearLowestScore: previousYearData
        ? previousYearData?.lowestScore
        : 0,
    });
  }
  console.log("data", data);
  return (
    <Table
      style={{ margin: "8px" }}
      columns={columns}
      dataSource={data}
      bordered
      size="large"
      scroll={{ x: "calc(700px + 50%)" }}
    />
  );
};

export default RecommendTable;
