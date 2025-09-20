import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { CreateComplaintDto } from './dto/createComplaint.dto';
import { GetAllQueryComplaintDto } from './dto/getAllQuery.dto';
import { UpdateComplaintDto } from './dto/updateComplaint.dto';

@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) { }


  @Get('all')
  getAll(@Query() query: GetAllQueryComplaintDto) {
    return this.complaintService.getAll(query.postId)
  }


  @Get('one/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.complaintService.getOne(id)
  }


  @Post('create')
  create(@Body() payload: CreateComplaintDto, @Req() req: Request | any) {
    return this.complaintService.create(payload, req)
  }


  @Put('udpate/:id')
  update(
    @Body() payload: UpdateComplaintDto,
    @Req() req: Request | any,
    @Param('id', ParseIntPipe) id: number) {
    return this.complaintService.update(id, payload, req)
  }


  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number, @Req() req: Request | any) {
    return this.complaintService.delete(id, req)
  }
}
