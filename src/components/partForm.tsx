 {/* Sección de Contacto */}
        <div className="pt-2 border-t">
          <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
            Contacto
          </h3>

          <div className="flex flex-col gap-4">
            {/* Teléfono */}
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+XX XXX XXX XX XX"
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="christian@gmail.com"
                required
              />
            </div>
          </div>
        </div>

        {/* Campo de Ubicación */}
        <div>
          <Label htmlFor="location">Ubicación (Ciudad, País)</Label>
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="Ej: Madrid, España"
            required
          />
        </div>

        {/* Enlaces Relevantes (LinkedIn, GitHub, Portafolio) */}
        {/* <div className="pt-2 border-t">
          <h3 className="text-xl text-center font-bold text-teal-800 mb-3">
            Enlaces
          </h3>

          {platforms.map((platform) => (
            <div key={platform} className="mb-3">
              <Label htmlFor={platform.toLowerCase()}>{platform} URL</Label>
              <Input id={platform.toLocaleLowerCase()} name={platform.toLocaleLowerCase()} type="url" placeholder={platform} required/>
            </div>
          ))}
        </div> */}
        {/* Sección Experiencia y Educación */}
        <div className="pt-4 border-t">
          <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
            Educación
          </h3>

          <div className="flex flex-col gap-4">

            <div>
              <Label htmlFor="degree">Grado / Título</Label>
              <Input
                id="degree"
                name="degree"
                type="text"
                placeholder="Ej: Ingeniería en Sistemas"
                required
              />
            </div>

            <div>
              <Label htmlFor="institution">Institución</Label>
              <Input
                id="text"
                name="institution"
                type="text"
                placeholder="Ej: Universidad X"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="eduFrom">Desde</Label>
                <Input
                  id="eduFrom"
                  name="eduFrom"
                  type="text"
                  placeholder="MM/AAAA"
                  required
                />
              </div>

              <div className="flex-1">
                <Label htmlFor="eduTo">Hasta</Label>
                <Input
                  id="eduTo"
                  name="eduTo"
                  type="text"
                  placeholder="MM/AAAA o actual"
                />
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="pt-4 border-t">
          <h3 className="text-xl font-bold text-center text-teal-800 mb-3">
            Experiencias
          </h3>
          <div id="expContainer" className="flex flex-col gap-2.5">

            {experiences && experiences.map((exp, index) => (
              <div key={index} className="border p-2 rounded-md bg-gray-50">
                <h4 className="font-semibold">{exp.jobTitle} - {exp.company}</h4>
                <p className="text-sm text-gray-600">{exp.from} - {exp.to}</p>
              </div>
            ))}

            <div>
              <div>
              <Label htmlFor="jobTitle">Posición</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                type="text"
                placeholder="Ej: Desarrollador Frontend"
                required
              />
            </div>

            <div>
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Ej: Empresa S.A."
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="jobFrom">Desde</Label>
                <Input
                  id="jobFrom"
                  name="jobFrom"
                  type="text"
                  placeholder="MM/AAAA"
                  required
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="jobTo">Hasta</Label>
                <Input
                  id="jobTo"
                  name="jobTo"
                  type="text"
                  placeholder="MM/AAAA o Actual"
                  required
                />
              </div>
            </div>
            <Button id="expButton"  type="button" className="bg-blue-500 p-2 text-white hover:bg-blue-900">Otra exp</Button>
            </div>
          </div>
        </div>