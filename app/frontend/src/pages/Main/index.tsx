import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  type RadioChangeEvent,
  Row,
  Select,
  Space,
} from "antd";
import { useState } from "react";
import { recommend } from "../../apis/commom";
import RecommendTable from "./RecommendTable";
const { Option } = Select;
import Papa from "papaparse";
// import { parse } from "json2csv";
import "./index.less";
const Main = () => {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const [subject, setSubject] = useState("physics");
  const [form] = Form.useForm();
  const [universities, setUniversities] = useState({});

  function downloadFile(data: any, values: any, type: string) {
    const result = data.school.schoolInfo.map((item: any) => ({
      院校代号: item.schoolId,
      "院校、专业组（再选科目要求）": item.required,
      [`${lastYear}年投档最低分`]: item[lastYear].lowestScore,
      [`${lastYear}年投档最低名次`]: item[lastYear].rank,
      [`${lastYear - 1}年投档最低分`]: item[lastYear - 1]
        ? item[lastYear - 1].lowestScore
        : 0,
      [`${lastYear - 1}年投档最低名次`]: item[lastYear - 1]
        ? item[lastYear - 1].rank
        : 0,
      投档最低分同分考生排序项: {
        语数成绩: item[lastYear].sortRule.chineseAndMath,
        语数最高成绩: item[lastYear].sortRule.chineseAndMathHighest,
        外语成绩: item[lastYear].sortRule.english,
        首选科目成绩: item[lastYear].sortRule.firstSubject,
        再选科目最高成绩: item[lastYear].sortRule.secondSubject,
        志愿号: item[lastYear].sortRule.id,
      },
    }));
    // const csv = parse(result);
    const csv = Papa.unparse(result, {
      header: true,
      delimiter: ",",
      columns: [
        "院校代号",
        "院校、专业组（再选科目要求）",
        `${lastYear}年投档最低分`,
        `${lastYear}年投档最低名次`,
        `${lastYear - 1}年投档最低分`,
        `${lastYear - 1}年投档最低名次`,
        "投档最低分同分考生排序项",
      ],
    });
    const url = window.URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const link = document.createElement("a");
    link.href = url;
    const sub = subject === "physics" ? "物理" : "历史";
    link.download = `${currentYear}年高考志愿推荐-${sub}-${values.score}-${type}${data.school.schoolInfo.length}所.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const onFinish = async (values: any) => {
    const count = values.count ? values.count : 300;
    const data_sprint = (await recommend(
      subject,
      values.score,
      5,
      count,
    )) as any;
    downloadFile(data_sprint, values, "冲刺院校");

    const data_keep = (await recommend(
      subject,
      values.score,
      -10,
      count,
    )) as any;
    downloadFile(data_keep, values, "保守院校");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  async function query() {
    try {
      console.log("Success:", subject, form.getFieldValue("score"));
      const response = (await recommend(
        subject,
        form.getFieldValue("score"),
        0,
        300,
      )) as any;
      console.log(response);
      setUniversities(response);
    } catch (e) {}
  }

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setSubject(e.target.value);
  };

  const onCityChange = (value: string) => {
    switch (value) {
      case "jiangsu":
        form.setFieldsValue("jiangsu");
        return;
    }
  };
  return (
    <div className="query">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true, city: "jiangsu" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
        form={form}
      >
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Form.Item name="city" label="地区">
              <Select
                placeholder="Select a option and change input text above"
                onChange={onCityChange}
                style={{ maxWidth: "200px" }}
              >
                <Option value="jiangsu">江苏</Option>
                <Option value="other" disabled>
                  待添加
                </Option>
                {/*<Option value="other">other</Option>*/}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            {" "}
            <Form.Item label="选科">
              <Radio.Group onChange={onChange} value={subject}>
                <Radio value="physics"> 物理 </Radio>
                <Radio value="history"> 历史 </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={1}></Col>
        </Row>

        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            {" "}
            <Form.Item
              label="总分"
              name="score"
              rules={[{ required: true, message: "总分忘记喽！" }]}
            >
              <Input style={{ maxWidth: "200px" }} />
            </Form.Item>
            <Form.Item label="推荐学校数量" name="count">
              <Input style={{ maxWidth: "200px" }} />
            </Form.Item>
          </Col>
          <Col span={1}></Col>
        </Row>

        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space size="large">
                <Button type="primary" onClick={query}>
                  查询
                </Button>
                <Button type="primary" htmlType="submit">
                  下载推荐表
                </Button>
              </Space>
            </Form.Item>
          </Col>
          <Col span={1}></Col>
        </Row>
      </Form>

      {(universities as any)?.school?.schoolInfo ? (
        <div>
          <div>
            <Row style={{ margin: "8px" }}>
              <Space split={<Divider type="vertical" />}>
                <p>
                  {`${currentYear}年分数:`}
                  {(universities as any).scoreAndRank[`${currentYear}`].score}
                </p>
                <p>
                  {`${currentYear}年全省排名:`}
                  {(universities as any).scoreAndRank[`${currentYear}`].rank}
                </p>
                <p>
                  {`${currentYear - 1}年换算分数:`}
                  {
                    (universities as any).scoreAndRank[`${currentYear - 1}`]
                      .score
                  }
                </p>
                <p>
                  {`${currentYear - 1}年全省排名:`}
                  {
                    (universities as any).scoreAndRank[`${currentYear - 1}`]
                      .rank
                  }
                </p>
              </Space>
            </Row>
          </div>
          <RecommendTable
            universities={(universities as any).school.schoolInfo}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
