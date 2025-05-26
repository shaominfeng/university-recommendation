import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Subject } from './entities/universities.interface';
import xlsx from 'node-xlsx';
import path from 'path';
import dayjs from 'dayjs';
@Injectable()
export class UniversitiesService {
  private readonly logger = new Logger(UniversitiesService.name);
  private readonly currentYear: number = dayjs().year();
  private readonly upScore = 5;
  find(subject, score) {
    try {
      if (subject === 'history') {
        return this.filterAllSchoolsByCategory(subject, this.currentYear - 1, score);
      } else if (subject === 'physics') {
        return this.filterAllSchoolsByCategory(subject, this.currentYear - 1, score);
      } else {
        return '科目只支持"历史=history"或者"物理=physics"';
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  recommendSchool(subject, score, offset, limitNumber) {
    if (subject === 'history') {
      return this.recommend(subject, score, offset, limitNumber);
    } else if (subject === 'physics') {
      return this.recommend(subject, score, offset, limitNumber);
    } else {
      return '科目只支持"历史=history"或者"物理=physics"';
    }
  }

  findAll(subject: Subject, year) {
    const filename = `${year}/${year}-${subject}.xlsx`;
    // Parse a file
    let data = this.readFile(filename);
    data.sort((a, b) => b[2] - a[2]);
    data = this.parseString(year, data);
    return data;
  }


  /**
   * {
   *     "score": "519",
   *     "samScoreNumber": "517",
   *     "rank": "31465"
   * }
   * @param subject
   * @param year
   * @param score
   */
  findRankDetails(subject: Subject, year: number, score: number) {
    try {
      const filename = `${year}/${year}-${subject}-rank.xlsx`;
      // Parse a file
      const data = this.readFile(filename);
      const rank = this.findRankByScore(data, subject, year, score);
      if (rank[0] >= data[0][0]) {
        return {
          score: data[0][0],
          samScoreNumber: data[0][1],
          rank: data[0][2],
          message: '恭喜你，你的分数已经突破天际，我们无法准确查到你的具体排名了！',
        };
      } else {
        return {
          score: rank[0],
          samScoreNumber: rank[1],
          rank: rank[2],
        };
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findRankByScore(data, subject: Subject, year: number, score: number) {
    if (Number(score) >= Number(data[0][0])) {
      return [Number(score), 0, 0];
    }
    if (Number(score) < Number(data[data.length - 1][0])) {
      return [Number(data[data.length - 1][0]), data[data.length - 1][1], data[data.length - 1][2]];
    }
    const result = data.find(function (item) {
      if (Number(item[0]) === Number(score)) {
        return [Number(item[0]), Number(item[1]), Number(item[2])];
      }
    });
    return result;
  }

  private readFile(filename: string) {
    try {
      const filePath = path.join(__dirname, `../../file/${filename}`);
      const workSheetsFromFile = xlsx.parse(`${filePath}`);
      return workSheetsFromFile[0].data;
    } catch (error) {
      throw new HttpException({ message: '请求参数无效' }, HttpStatus.BAD_REQUEST);
    }
  }

  private async recommend(subject: Subject, score: number, offset: number, limitNumber) {
    const rankData = this.readFile(`${this.currentYear}/${this.currentYear}-${subject}-rank.xlsx`);
    const rank = this.findRankByScore(rankData, subject, this.currentYear, score);
    if (rank[1] === 0 && rank[2] === 0) {
      return '恭喜你，你的分数已经突破天际，学校任你选！';
    }
    const lastRankData = this.readFile(`${this.currentYear - 1}/${this.currentYear - 1}-${subject}-rank.xlsx`);
    const preRank = lastRankData.find(function (item) {
      if (Number(item[2]) >= Number(rank[2])) {
        return item;
      }
    });
    const res = this.filterAllSchoolsByCategory(subject, this.currentYear - 1, preRank[0], offset).slice(
      0,
      limitNumber,
    );
    return {
      scoreAndRank: {
        [`${this.currentYear}`]: {
          score: rank[0],
          sameScoreNumber: rank[1],
          rank: rank[2],
        },
        [`${this.currentYear - 1}`]: {
          score: preRank[0],
          sameScoreNumber: preRank[1],
          rank: preRank[2],
        },
      },
      school: {
        schoolInfo: res,
      },
    };
  }


  private filterAndDesc(data: any[], score: number, offset = 0) {
    if (offset !== 0) {
      const max = Math.max(score + offset, score);
      const min = Math.min(score + offset, score);
      data = data.filter((s) => s[2] <= max && s[2] >= min);
    } else {
      data = data.filter((s) => s[2] <= score);
    }

    data.sort((a, b) => b[2] - a[2]);
    return data;
  }

  private filterAllSchoolsByCategory(category, year, score: number, offset = 0) {
    const self = this;
    const currentYearScoreData = this.findRankDetails(category, year, score);
    const rankData = this.readFile(`${year}/${year}-${category}-rank.xlsx`);
    let scoreData = this.readFile(`${year}/${year}-${category}.xlsx`);
    scoreData = this.filterAndDesc(scoreData, score, Number(offset));
    scoreData = this.parseString(year, scoreData);

    const lastRankData = this.readFile(`${year - 1}/${year - 1}-${category}-rank.xlsx`);
    const lastYearScoreData = this.readFile(`${year - 1}/${year - 1}-${category}.xlsx`);

    scoreData.forEach((item: any) => {
      item[`${year}`]['rank'] = self.findRankByScore(rankData, category, year, (item as any)[year].lowestScore)[2];
      const temp = self.findScoreBySchoolName(lastYearScoreData, item.required);
      if (temp) {
        item[`${year - 1}`] = {
          lowestScore: temp[2],
          rank: self.findRankByScore(lastRankData, category, year - 1, temp[2])[2],
        };
      }
    });
    return scoreData;
  }

  // private filterHistory(category, year, score: number, offset = 0) {
  //   const self = this;
  //   const rankData = this.readFile(`${year}/${year}-${category}-rank.xlsx`);
  //   const lastRankData = this.readFile(`${year - 1}/${year - 1}-${category}-rank.xlsx`);
  //   let scoreData = this.readFile(`${year}/${year}-${category}.xlsx`);
  //   scoreData = this.filterAndDesc(scoreData, score, Number(offset));
  //   scoreData = this.parseString(year, scoreData);
  //
  //   const lastYearScoreData = this.readFile(`${year - 1}/${year - 1}-${category}.xlsx`);
  //
  //   scoreData.forEach((item: any) => {
  //     item[`${year}`]['rank'] = self.findRankByScore(rankData, category, year, (item as any)[year].lowestScore)[2];
  //     const temp = self.findScoreBySchoolName(lastYearScoreData, item.required);
  //     if (temp) {
  //       item[`${year - 1}`] = {
  //         lowestScore: temp[2],
  //         rank: self.findRankByScore(lastRankData, category, year - 1, temp[2])[2],
  //       };
  //     }
  //   });
  //   return scoreData;
  // }

  private findScoreBySchoolName(data: any[], schoolId: string) {
    const result = data.filter((item) => item[1] === schoolId);
    return result[0];
  }

  private parseString(year: number, data: any[]) {
    return data.map((item) => ({
      schoolId: item[0],
      required: item[1],
      [year]: {
        lowestScore: item[2],
        sortRule: {
          chineseAndMath: item[3],
          chineseAndMathHighest: item[4],
          english: item[5],
          firstSubject: item[6],
          secondSubject: item[7],
          id: item[8],
        },
      },
    }));
  }
}
