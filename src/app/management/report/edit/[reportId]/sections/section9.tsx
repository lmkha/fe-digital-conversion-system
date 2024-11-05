import { Divider, Stack, Typography } from "@mui/material";
import Row2 from "../components/row2";
import Row3 from "../components/row3";

export default function Section9() {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>9. Tình hình quan trắc môi trường</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row2 label1="Số mẫu quan trắc môi trường lao động (Mẫu)" label2="Số mẫu không đạt tiêu chuẩn(Mẫu) " />
                <Row3 label1="Mẫu nhiệt độ không đạt (Mẫu /Mẫu )" label2="Mẫu độ ẩm không đạt (Mẫu/Mẫu)" label3="Mẫu tốc độ gió không đạt (Mẫu/Mãu)" />
                <Row3 label1="Mẫu ánh sáng không đạt (Mẫu/Mẫu)" label2="Mẫu tiếng ồn không đạt (Mẫu/Mẫu)" label3="Mẫu bụi không đạt (Mẫu/Mẫu)" />
                <Row3 label1="Mẫu rung không đạt (Mẫu/Mẫu)" label2="Mẫu hơi khí độc không đạt (Mẫu/Mẫu)" label3="Mẫu phóng xạ không đạt (Mẫu/Mẫu)" />
                <Row2 label1="Mẫu điện từ trường không đạt (Mẫu/Mẫu)" label2="Mẫu khác không đạt (Mẫu/Mẫu)" />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
