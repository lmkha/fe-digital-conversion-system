import { Divider, Stack, Typography } from "@mui/material";
import Row2, { Row2Data } from "../components/row2";
import Row3, { Row3Data } from "../components/row3";
export interface Section9Data {
    row1?: Row2Data;
    row2?: Row3Data;
    row3?: Row3Data;
    row4?: Row3Data;
    row5?: Row2Data;
}
interface Section9Props {
    data?: Section9Data;
    onChange?: (data: Section9Data) => void;
}

export default function Section9({
    data = {
        row1: { value1: "0", value2: "0" },
        row2: { value1: "0/0", value2: "0/0", value3: "0/0" },
        row3: { value1: "0/0", value2: "0/0", value3: "0/0" },
        row4: { value1: "0/0", value2: "0/0", value3: "0/0" },
        row5: { value1: "0/0", value2: "0/0" }
    },
    onChange
}: Section9Props) {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} paddingBottom={2}>9. Tình hình quan trắc môi trường</Typography>
            </Stack>
            <Stack direction={'column'} spacing={2} paddingBottom={2}>
                <Row2
                    label1="Số mẫu quan trắc môi trường lao động (Mẫu)"
                    label2="Số mẫu không đạt tiêu chuẩn(Mẫu) "
                    value={data?.row1}
                    onChange={(value) => onChange?.({ ...data, row1: value })}
                />
                <Row3
                    label1="Mẫu nhiệt độ không đạt (Mẫu /Mẫu )"
                    label2="Mẫu độ ẩm không đạt (Mẫu/Mẫu)"
                    label3="Mẫu tốc độ gió không đạt (Mẫu/Mãu)"
                    value={data?.row2}
                    onChange={(value) => onChange?.({ ...data, row2: value })}
                />
                <Row3
                    label1="Mẫu ánh sáng không đạt (Mẫu/Mẫu)"
                    label2="Mẫu tiếng ồn không đạt (Mẫu/Mẫu)"
                    label3="Mẫu bụi không đạt (Mẫu/Mẫu)"
                    value={data?.row3}
                    onChange={(value) => onChange?.({ ...data, row3: value })}
                />
                <Row3
                    label1="Mẫu rung không đạt (Mẫu/Mẫu)"
                    label2="Mẫu hơi khí độc không đạt (Mẫu/Mẫu)"
                    label3="Mẫu phóng xạ không đạt (Mẫu/Mẫu)"
                    value={data?.row4}
                    onChange={(value) => onChange?.({ ...data, row4: value })}
                />
                <Row2
                    label1="Mẫu điện từ trường không đạt (Mẫu/Mẫu)"
                    label2="Mẫu khác không đạt (Mẫu/Mẫu)"
                    value={data?.row5}
                    onChange={(value) => onChange?.({ ...data, row5: value })}
                />
            </Stack>
            <Divider sx={{ marginBottom: 2 }} />
        </>
    );
}
