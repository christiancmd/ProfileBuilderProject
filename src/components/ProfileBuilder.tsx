import ProfileHeader from "./ui/Molecules/ProfileHeader";
import PersonalAside from "./PersonalAside";
import MinimalistCurriculum from "../templates/MinimalistCurriculum";
import ModernCurriculum from "../templates/ModernCurriculum";

interface ProfileBuilderProps {
  title: string
}

export default function ProfileBuilder({ title }: ProfileBuilderProps) {

  return (
    <div className="w-full min-h-screen flex flex-col md:grid md:grid-cols-4 gap-4 p-4 border bg-gray-200">
      <PersonalAside />
      <section className=" md:col-span-3 order-0 md:order-0 h-full flex flex-col">
        <ProfileHeader title="Previsualizacion del Curriculum" />
        <div className="w-full bg-gray-400 border border-gray-700 p-8 flex flex-col items-center rounded-lg gap-6 grow ">
          <div className="sticky top-0 border w-3/4 lg:w-8/12 min-h-[1000px] bg-white shadow-xl overflow-y-auto">
            
            {/* <MinimalistCurriculum /> */}
            {
              title === 'minimalist' ? <MinimalistCurriculum /> : <ModernCurriculum />
            } 
          </div>
        </div>
      </section>
    </div>
  );
}
