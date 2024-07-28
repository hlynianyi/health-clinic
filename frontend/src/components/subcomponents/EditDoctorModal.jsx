import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const DAYS_OF_WEEK = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const EditDoctorModal = ({ open, onClose, doctor, onChange, onSave }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...doctor, [name]: value });
  };

  const toggleDaySelection = (day) => {
    onChange({
      ...doctor,
      days: doctor.days.includes(day)
        ? doctor.days.filter((d) => d !== day)
        : [...doctor.days, day],
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Редактировать Доктора</DialogTitle>
      <DialogContent>
        <div className="flex flex-col my-4">
          <TextField
            required
            id="login"
            label="Логин:"
            name="login"
            value={doctor?.login || ""}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "16px" }}
          />
          <TextField
            required
            id="password"
            label="Пароль:"
            type="password"
            name="password"
            value={doctor?.password || ""}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "16px" }}
          />
          <TextField
            required
            id="email"
            label="Email:"
            type="email"
            name="email"
            value={doctor?.email || ""}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "16px" }}
          />
          <TextField
            required
            id="name"
            label="Ф.И.О:"
            name="name"
            value={doctor?.name || ""}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "16px" }}
            variant="filled"
          />
          <TextField
            required
            id="specialty"
            label="Специальность:"
            name="specialty"
            value={doctor?.specialty || ""}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "16px" }}
            variant="filled"
          />
          <TextField
            id="experience"
            label="Опыт работы:"
            type="number"
            name="experience"
            value={doctor?.experience || ""}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "16px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
          <TextField
            id="education"
            label="Образование:"
            name="education"
            value={doctor?.education || ""}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "16px" }}
            variant="filled"
          />
          <textarea
            id="about"
            placeholder="О специалисте:"
            name="about"
            value={doctor?.about || ""}
            onChange={handleInputChange}
            style={{
              width: "100%",
              marginBottom: "16px",
            }}
          />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Дни работы:
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDaySelection(day)}
                  className={`text-white py-1 px-2 rounded ${
                    doctor?.days?.includes(day)
                      ? "bg-mainblue text-white"
                      : "bg-bgdarkgray"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Часы работы:
            </label>
            <div className="flex gap-4">
              <TextField
                required
                id="startHour"
                label="От"
                type="number"
                value={doctor?.startHour || 8}
                onChange={(e) =>
                  onChange({ ...doctor, startHour: parseInt(e.target.value) })
                }
                InputProps={{ inputProps: { min: 0, max: 23 } }}
                sx={{ mb: 2, width: "100px" }}
              />
              <TextField
                required
                id="endHour"
                label="До"
                type="number"
                value={doctor?.endHour || 16}
                onChange={(e) =>
                  onChange({ ...doctor, endHour: parseInt(e.target.value) })
                }
                InputProps={{ inputProps: { min: 0, max: 23 } }}
                sx={{ mb: 2, width: "100px" }}
              />
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => onChange({ ...doctor, photo: e.target.files[0] })}
            style={{ marginTop: "1rem" }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDoctorModal;
