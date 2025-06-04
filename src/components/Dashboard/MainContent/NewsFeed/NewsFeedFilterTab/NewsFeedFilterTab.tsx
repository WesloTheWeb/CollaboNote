
import classes from './FilterTab.module.scss';

type TabItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
    disabled?: boolean;
};

type FilterTabProps = {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
};

const {
    tabContainer,
    tab,
    tabIcon,
    active,
    disabled
} = classes;

const FilterTab = ({ tabs, activeTab, onTabChange }: FilterTabProps) => {
    const handleTabClick = (tabId: string, isDisabled?: boolean) => {
        if (!isDisabled) {
            onTabChange(tabId);
        }
    };

    return (
        <section className={tabContainer}>
            {tabs.map(({ id, label, icon, disabled: isDisabled }) => (
                <button
                    key={id}
                    className={`${tab} ${activeTab === id ? active : ''} ${isDisabled ? disabled : ''}`}
                    onClick={() => handleTabClick(id, isDisabled)}
                    disabled={isDisabled}
                    type="button"
                >
                    <span className={tabIcon}>
                        {icon}
                    </span>
                    {label}
                </button>
            ))}
        </section>
    );
};

export default FilterTab;