import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { Subject } from './entities/universities.interface';

@Controller('/__/')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  /**
   *
   * @param subject 选课
   * @param score 去年的分数
   * 返回可以去年可以报考的学校信息
   */
  @Get('universities/subject/:subject/score/:score')
  filterUniversity(@Param('subject') subject: Subject, @Param('score') score: number) {
    return this.universitiesService.find(subject, score);
  }

  /**
   * 建议使用这个API
   * @param subject
   * @param score
   * @param offset 分数偏移，主要是为了冲刺，可以选择0-5分的偏移
   * @param limitNumber 返回院校的最大数目，分数越高，可以报考的学校越多，相反这个数字可以缩小一点
   */
  @Get('universities/subject/:subject/score/:score/offset/:offset/recommend/:limitNumber')
  universityRecommend(
    @Param('subject') subject: Subject,
    @Param('score') score: number,
    @Param('offset') offset: number,
    @Param('limitNumber') limitNumber: number,
  ) {
    return this.universitiesService.recommendSchool(subject, score, offset, limitNumber);
  }

  @Get('universities/year/:year/subject/:subject')
  findAll(@Param('subject') subject: Subject, @Param('year') year: number) {
    return this.universitiesService.findAll(subject, year);
  }

  @Get('ranks/year/:year/subject/:subject/score/:score/rank')
  findRank(@Param('subject') subject: Subject, @Param('year') year: number, @Param('score') score: number) {
    return this.universitiesService.findRankDetails(subject, year, score);
  }
}
