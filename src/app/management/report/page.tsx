// pages/report.js
import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ReportPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Occupational Safety and Hygiene Report
      </Typography>

      {/* Step Indicator */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          1. Report Declaration
        </Typography>
        <Typography variant="h6" color="textSecondary">
          2. Review Report
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Form Sections */}
      <Stack spacing={4}>
        {/* Section 1: Thông tin lao động */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            1. Thông tin lao động
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng số lao động"
                fullWidth
                variant="outlined"
                defaultValue="179"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Người làm công tác ATYSLĐ"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Người làm công tác y tế"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Lao động nữ"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Lao động làm việc trong điều kiện độc hại"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Lao động là người chưa thành niên"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Lao động dưới 15 tuổi"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Lao động người khuyết tật"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Lao động người cao tuổi"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
          </Grid>
        </Box>
        {/* Section 2: Thông tin tai nạn lao động */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            2. Thông tin tai nạn lao động
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng số vụ TNLĐ"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số vụ có người chết"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số người chết vì TNLĐ"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số người bị TNLĐ"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng chi phí cho TNLĐ"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số ngày công vì TNLĐ"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
          </Grid>
        </Box>
        {/* Section 3: Bệnh nghề nghiệp */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            3. Bệnh nghề nghiệp
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng số người bị BNN tới thời điểm BC"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số người mắc mới BNN"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số người phải nghỉ trước tuổi hưu vì BNN"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng chi phí BNN phát sinh trong năm"
                fullWidth
                variant="outlined"
                defaultValue="10.2"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số ngày công nghỉ phép về BNN"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
          </Grid>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            *** Lưu ý: nhập số tiền theo đơn vị Triệu đồng
          </Typography>
        </Box>
        // Section 4: Kết quả phân loại sức khoẻ của người lao động
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            4. Kết quả phân loại sức khoẻ của người lao động
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Loại I (Người)"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Loại II (Người)"
                fullWidth
                variant="outlined"
                defaultValue="4"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Loại III (Người)"
                fullWidth
                variant="outlined"
                defaultValue="6"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Loại IV (Người)"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Loại V (Người)"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
          </Grid>
        </Box>
        // Section 5: Huấn luyện về vệ sinh an toàn lao động
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            5. Huấn luyện về vệ sinh an toàn lao động
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nhóm 1: SL huấn luyện/SL hiện có"
                fullWidth
                variant="outlined"
                defaultValue="10/10"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nhóm 2: SL huấn luyện/SL hiện có (người/người)"
                fullWidth
                variant="outlined"
                defaultValue="6/12"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nhóm 3: SL huấn luyện/SL hiện có (người/người)"
                fullWidth
                variant="outlined"
                defaultValue="10/20"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Trong đó: Tự huấn luyện"
                fullWidth
                variant="outlined"
                defaultValue="5/20"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Thuê tổ chức cung cấp dịch vụ huấn luyện"
                fullWidth
                variant="outlined"
                defaultValue="5/20"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nhóm 4: SL huấn luyện/SL hiện có (người/người)"
                fullWidth
                variant="outlined"
                defaultValue="5/20"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nhóm 5: SL huấn luyện/SL hiện có (người/người)"
                fullWidth
                variant="outlined"
                defaultValue="5/20"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Nhóm 6: SL huấn luyện/SL hiện có (người/người)"
                fullWidth
                variant="outlined"
                defaultValue="5/20"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng chi phí huấn luyện"
                fullWidth
                variant="outlined"
                defaultValue="10.2"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            *** Lưu ý: nhập số tiền theo đơn vị Triệu đồng
          </Typography>
        </Box>
        {/* Section 6: Máy, thiết bị, vật tư có yêu cầu nghiêm ngặt về ATVSLĐ */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            6. Máy, thiết bị, vật tư có yêu cầu nghiêm ngặt về ATVSLĐ
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng số"
                fullWidth
                variant="outlined"
                defaultValue="4"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Máy có yêu cầu nghiêm ngặt ATVSLĐ đang sử dụng"
                fullWidth
                variant="outlined"
                defaultValue="4"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số chưa được kiểm định"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số đã được kiểm định"
                fullWidth
                variant="outlined"
                defaultValue="4"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số chưa được khai báo"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số đã được khai báo"
                fullWidth
                variant="outlined"
                defaultValue="4"
              />
            </Grid>
          </Grid>
        </Box>
        {/* Section 7: Thời gian làm việc, thời gian nghỉ ngơi */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            7. Thời gian làm việc, thời gian nghỉ ngơi
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng số người làm thêm trong năm (người)"
                fullWidth
                variant="outlined"
                defaultValue="4"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng số giờ làm thêm trong năm (người)"
                fullWidth
                variant="outlined"
                defaultValue="4"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Số giờ làm thêm cao nhất trong 1 tháng (người)"
                fullWidth
                variant="outlined"
                defaultValue="4"
              />
            </Grid>
          </Grid>
        </Box>
        // Section 8: Bồi dưỡng chống độc hại bằng hiện vật
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            8. Bồi dưỡng chống độc hại bằng hiện vật
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng số người"
                fullWidth
                variant="outlined"
                defaultValue="1"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Tổng chi phí quy định tại điểm 10"
                fullWidth
                variant="outlined"
                defaultValue="10.2"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            *** Lưu ý: nhập số tiền theo đơn vị Triệu đồng
          </Typography>
        </Box>
        {/* Section 9: Tình hình quan trắc môi trường */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            9. Tình hình quan trắc môi trường
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Số mẫu quan trắc môi trường lao động (Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="60"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Số mẫu không đạt tiêu chuẩn (Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu nhiệt độ không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu độ ẩm không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu ánh sáng không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu tốc độ gió không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu rung không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu tiếng ồn không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu điện từ trường không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu hơi khí độc không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu bụi không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu phóng xạ không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu hơi khí không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu bức xạ không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Mẫu phóng xạ khác không đạt (Mẫu/Mẫu)"
                fullWidth
                variant="outlined"
                defaultValue="0/0"
              />
            </Grid>
          </Grid>
        </Box>
        // Section 10: Chi phí thực hiện kế hoạch ATVSLĐ
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            10. Chi phí thực hiện kế hoạch ATVSLĐ
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Các biện pháp kỹ thuật an toàn"
                fullWidth
                variant="outlined"
                defaultValue="10.258"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Các biện pháp kỹ thuật vệ sinh"
                fullWidth
                variant="outlined"
                defaultValue="4"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Chăm sóc sức khỏe người lao động"
                fullWidth
                variant="outlined"
                defaultValue="4"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Tuyên truyền huấn luyện"
                fullWidth
                variant="outlined"
                defaultValue="4"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Chi khác"
                fullWidth
                variant="outlined"
                defaultValue="4"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Trang bị phương tiện bảo vệ cá nhân"
                fullWidth
                variant="outlined"
                defaultValue="4"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Đánh giá nguy cơ rủi ro về ATVSLĐ"
                fullWidth
                variant="outlined"
                defaultValue="4"
                InputProps={{
                  endAdornment: <Typography>Triệu đồng</Typography>,
                }}
              />
            </Grid>
          </Grid>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            *** Lưu ý: nhập số tiền theo đơn vị Triệu đồng
          </Typography>
        </Box>
      </Stack>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default ReportPage;
