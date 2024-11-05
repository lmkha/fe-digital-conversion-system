import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";
import Row1 from "../components/row1";

export default function Section10() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>10. Chi phí thực hiện kế hoạch ATVSLĐ</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row3 label1="Các biện pháp kỹ thuật an toàn " label2="Các biện pháp kỹ thuật vệ sinh " label3="Trang bị phương tiện bảo vệ cá nhân" />
                <Row3 label1="Chăm sóc sức khỏe người lao động" label2="Tuyên truyền huấn luyện" label3="Đánh giá nguy cơ rủi tro về ATVSLĐ " />
                <Row1 label1="Chi khác " />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}