# 📓 Bitácora del curso · RCP Básico

## Sesión 1 · 2026-06-04

### Decisiones tomadas
- **Preset visual**: `vital` (apropiado para salud)
- **Versión template**: `hibrida` (default)
- **Cliente**: pendiente · usando placeholder `TU MARCA`
- **Pantallas**: 25 (granularidad fina, respeta el Word)
- **Imágenes**:
  - 10 HD del usuario · cubren las pantallas principales
  - 5 embebidas del Word · complementan
  - 1 pendiente · collage de personas pantalla 05 (yo bajo de Unsplash)

### Setup ejecutado
- ✅ Template `template-blanco/` clonado a `cursos/rcp-basico/`
- ✅ `_source/` y `_proceso/` preservados intactos
- ✅ 15 imágenes copiadas a `assets/img/curso/` con nombres `pNN-descripcion.png`
- ✅ `course.js` configurado con 25 entradas + glosario (10 términos) + referencias + créditos placeholder
- ✅ Preset cambiado: todos los HTML referencian `theme-vital.css`
- ✅ HTMLs demo del template removidos (`tema-1.html`, `tema-2.html`, `actividad.html`)
- ⚠️ Quedan en el curso `showcase.html`, `presets.html`, `manual-marca.html`, `workflow.html` como referencia interna · borrar antes de empaquetar para LMS
- ✅ Pantalla 01 (`index.html` · Portada) generada

### Patrones detectados en el Word (notas para automatización futura)
- La diseñadora **ya marcó los componentes inline** (Acordeón, Carrusel, Stepper, Comparativo, Video, Modal, Pódcast, Línea de tiempo)
- "Botón: Atención/No hacer/Recuerda/Tener en cuenta/Practica/Sabías que…" se mapea a `wg-callout` con variantes (warning, danger, info, success, default)
- Referencias a "Imagen N" en el texto NO siempre matchean con el orden de archivos del usuario (mapear visualmente)
- Algunas imágenes "a generar" YA están hechas y embebidas (ahorro de trabajo)

### Próximos pasos
- [ ] Esperar OK del usuario sobre Pantalla 01
- [ ] Generar pantallas 02-25 secuencialmente
- [ ] Resolver collage personas (Pantalla 05)
- [ ] Resolver video link en Pantalla 03 (Conceptos básicos) y Pantalla 11 (RCP de calidad)
- [ ] Resolver podcast link en Pantalla 21 (Conclusiones)
- [ ] Cuando confirme el cliente: actualizar `course.js` brand + créditos
- [ ] QA final: revisar en las 3 versiones (Híbrida / Clara / Oscura)
- [ ] Empaquetar ZIP para LMS

### Pendientes técnicos del curso
| Pantalla | Falta | Tipo |
|---|---|---|
| 03 · Conceptos básicos | Video 1 (¿Qué es insuficiencia cardíaca?) | Link |
| 05 · ¿Quién puede presentarla? | Collage 4 personas | Imágenes |
| 11 · RCP de alta calidad | Video 2 (Paso a paso ante inconsciente que no respira) | Link |
| 21 · Conclusiones | Podcast (audio MP3) | Audio |
